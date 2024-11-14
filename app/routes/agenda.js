const express = require("express");
const router = express.Router();
const { Especialidad, Medico, Turno } = require('../models'); // Asegúrate de incluir los modelos necesarios
const especialidadController = require('../controllers/especialidadController');
const medicoController = require('../controllers/MedicoController');

// Obtener todas las especialidades y médicos
router.get('/', async (req, res) => {
    try {
      const especialidades = await especialidadController.getAll();
      const medicos = await medicoController.obtenerMedicos();
  
      // Renderiza ambas listas en la vista 'agendas'
      res.render('agendas', { especialidades, medicos });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// Filtrar citas
router.post('/filtrar', async (req, res) => {
    const { especialidad, medico } = req.body;

    try {
        // Simulated logic for filtering appointments using Sequelize
        const citas = await Turno.findAll({
            where: {
                especialidad: especialidad,
                medico: medico
            }
        });

        console.log(`Filtered appointments for ${especialidad} with ${medico}`);
        res.json(citas); // Devolver citas filtradas como respuesta JSON
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Transferir una cita
router.post('/transferir', async (req, res) => {
    const { nombre_paciente, doctor_anterior, fecha_cita_anterior, doctor_nuevo, fecha_cita_nueva, hora_cita_nueva } = req.body;

    try {
        // Lógica para transferir una cita (actualizar en la base de datos)
        const citaTransferida = await Turno.update(
            { medico: doctor_nuevo, fecha: fecha_cita_nueva, hora: hora_cita_nueva },
            { where: { nombrePaciente: nombre_paciente, medico: doctor_anterior, fecha: fecha_cita_anterior } }
        );

        if (citaTransferida[0] > 0) { // Si se actualizó al menos una fila
            console.log(`Appointment transferred for ${nombre_paciente} from ${doctor_anterior} to ${doctor_nuevo}`);
            res.send(`La cita para ${nombre_paciente} se ha transferido de ${doctor_anterior} a ${doctor_nuevo} para el ${fecha_cita_nueva} a las ${hora_cita_nueva}.`);
        } else {
            res.send(`No se pudo transferir la cita para ${nombre_paciente}. Verifique los datos ingresados.`);
        }
    } catch (err) {
        res.status(500).send('Error al transferir la cita: ' + err.message);
    }
});

module.exports = router;