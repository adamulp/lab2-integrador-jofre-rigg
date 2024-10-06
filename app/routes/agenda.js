const express = require("express");
const router = express.Router();

const Especialidad = require('../modelos/Especialidad');
const Medico = require('../modelos/Medico');

function transferirCita(nombre_paciente, doctor_anterior, fecha_cita_anterior, doctor_nuevo, fecha_cita_nueva, hora_cita_nueva) {
    // In a real application, update the appointment details in the database
    return true; // Hardcoded to simulate successful transfer
}

router.get('/', async (req, res) => {
    try {
        const especialidades = await Especialidad.query().select('nombre'); // Fetch all especialidades
        const medicos = await Medico.query().select('nombreCompleto'); // Fetch all medicos
        res.render('agendas', { especialidades, medicos });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Handle form submission for filtering appointments
// Placeholder function for filtering appointments
function filtrarCitas(especialidad, medico) {
  // Simulated logic for filtering appointments
  return []; // Return an empty array or mock data
}

router.post('/filtrar', (req, res) => {
  const { especialidad, medico } = req.body;

  // Simulated logic for filtering appointments
  const citas = filtrarCitas(especialidad, medico); // Placeholder function

  console.log(`Filtered appointments for ${especialidad} with ${medico}`);
  res.send(`Citas filtradas para ${especialidad} con ${medico}: ${JSON.stringify(citas)}`);
});

// Handle form submission for transferring an appointment
router.post('/transferir', (req, res) => {
  const { nombre_paciente, doctor_anterior, fecha_cita_anterior, doctor_nuevo, fecha_cita_nueva, hora_cita_nueva } = req.body;

  // Simulated logic for transferring an appointment
  const citaTransferida = transferirCita(nombre_paciente, doctor_anterior, fecha_cita_anterior, doctor_nuevo, fecha_cita_nueva, hora_cita_nueva); // Placeholder function

  if (citaTransferida) {
    console.log(`Appointment transferred for ${nombre_paciente} from ${doctor_anterior} to ${doctor_nuevo}`);
    res.send(`La cita para ${nombre_paciente} se ha transferido de ${doctor_anterior} a ${doctor_nuevo} para el ${fecha_cita_nueva} a las ${hora_cita_nueva}.`);
  } else {
    res.send(`No se pudo transferir la cita para ${nombre_paciente}.`);
  }
});

module.exports = router;