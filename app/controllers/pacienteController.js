const { Paciente } = require('../modelos');

class PacienteController {
    // Crear un nuevo paciente
    static async crearPaciente(req, res) {
        try {
            const nuevoPaciente = await Paciente.create(req.body); // Cambié query().insert a create
            res.status(201).json(nuevoPaciente);
        } catch (error) {
            res.status(400).json({ error: 'Error al crear el paciente.' });
        }
    }

    // Obtener todos los pacientes
    static async obtenerPacientes(req, res) {
        try {
            console.log('Intentando obtener pacientes...');
            const pacientes = await Paciente.findAll({
                attributes: ['id_paciente','nombre_completo', 'dni', 'informacion_contacto', 'obra_social'] // Cambia estos atributos a los de tu tabla `Paciente`
            }); 
            console.log('Pacientes obtenidos:', pacientes);
            res.status(200).json(pacientes);
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