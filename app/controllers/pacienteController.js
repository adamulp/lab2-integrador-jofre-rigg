const { Op } = require('sequelize');
const { Paciente } = require('../modelos');

class PacienteController {
    // Crear un nuevo paciente
    static async crearPaciente(req, res) {
        try {
            const pacienteData = {
                nombre_completo: req.body.nombre_completo,
                dni: req.body.dni,
                informacion_contacto: req.body.contacto,  // Cambia 'contacto' por 'informacion_contacto'
                obra_social: req.body.obraSocial
            };

            await Paciente.create(pacienteData);
            res.redirect('/pacientes');
        } catch (error) {
            console.error("Error al crear el paciente:", error);
            res.status(400).json({ error: 'Error al crear el paciente.' });
        }
    }
//buscar un paciente por nombre y dni
static async buscarPaciente(req, res) {
    const { nombre_completo, dni } = req.body;

    // Construimos la condición de búsqueda dinámica
    const condiciones = [];
    
    if (nombre_completo) {
        condiciones.push({ nombre_completo: { [Op.like]: `%${nombre_completo}%` } });
    }
    
    if (dni) {
        condiciones.push({ dni: { [Op.like]: `%${dni}%` } });
    }

    try {
        const pacientes = await Paciente.findAll({
            where: {
                [Op.or]: condiciones // Solo se incluirán las condiciones presentes
            }
        });

        console.log("Pacientes encontrados:", pacientes); // Verifica los resultados antes de renderizar

        // Renderizamos la vista con los resultados encontrados
        if (pacientes.length === 0) {
            return res.render('resultadosPacientes', { pacientes: [], mensaje: "No se encontraron pacientes." });
        }

        res.render('resultadosPacientes', { pacientes });
    } catch (error) {
        console.error("Error al buscar el paciente:", error);
        res.status(400).json({ error: 'Error al buscar el paciente.' });
    }
}

    // Obtener todos los pacientes
    static async obtenerPacientes(req, res) {
        try {
            const pacientes = await Paciente.findAll({
                attributes: ['id_paciente','nombre_completo', 'dni', 'informacion_contacto', 'obra_social'] // Cambia estos atributos a los de tu tabla `Paciente`
            }); 
            res.render('pacientes', { pacientes });
        } catch (error) {
            console.error( error);
            res.status(500).json({ error: 'Error al obtener los pacientes.' });
        }
    }

    // Obtener un paciente por ID
    static async obtenerPacientePorId(req, res) {
        const { id } = req.params;
        try {
            const paciente = await Paciente.findByPk(id); // Cambié query().findById a findByPk
            if (!paciente) {
                return res.status(404).json({ error: 'Paciente no encontrado.' });
            }
            res.status(200).json(paciente);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el paciente.' });
        }
    }

    // Actualizar un paciente
    static async actualizarPaciente(req, res) {
        const { id } = req.params;
        try {
            const pacienteActualizado = await Paciente.update(req.body, {
                where: { id },
                returning: true, // Solo necesario en algunas configuraciones de Sequelize
            });
            if (!pacienteActualizado[0]) {
                return res.status(404).json({ error: 'Paciente no encontrado.' });
            }
            res.status(200).json(pacienteActualizado[1][0]);
        } catch (error) {
            res.status(400).json({ error: 'Error al actualizar el paciente.' });
        }
    }

    // Eliminar un paciente
    static async eliminarPaciente(req, res) {
        const { id } = req.params;
        try {
            const eliminadoCount = await Paciente.destroy({ where: { id } }); // Cambié query().deleteById a destroy
            if (!eliminadoCount) {
                return res.status(404).json({ error: 'Paciente no encontrado.' });
            }
            res.status(204).send(); // Sin contenido
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el paciente.' });
        }
    }
}

module.exports = PacienteController;