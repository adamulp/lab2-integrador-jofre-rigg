const Paciente = require('../models/Paciente');

class PacienteController {
    // Crear un nuevo paciente
    static async crearPaciente(req, res) {
        try {
            const nuevoPaciente = await Paciente.query().insert(req.body);
            res.status(201).json(nuevoPaciente);
        } catch (error) {
            res.status(400).json({ error: 'Error al crear el paciente.' });
        }
    }

    // Obtener todos los pacientes
    static async obtenerPacientes(req, res) {
        try {
            const pacientes = await Paciente.query();
            res.status(200).json(pacientes);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los pacientes.' });
        }
    }

    // Obtener un paciente por ID
    static async obtenerPacientePorId(req, res) {
        const { id } = req.params;
        try {
            const paciente = await Paciente.getPacienteById(id);
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
            const pacienteActualizado = await Paciente.query().patchAndFetchById(id, req.body);
            if (!pacienteActualizado) {
                return res.status(404).json({ error: 'Paciente no encontrado.' });
            }
            res.status(200).json(pacienteActualizado);
        } catch (error) {
            res.status(400).json({ error: 'Error al actualizar el paciente.' });
        }
    }

    // Eliminar un paciente
    static async eliminarPaciente(req, res) {
        const { id } = req.params;
        try {
            const pacienteEliminado = await Paciente.query().deleteById(id);
            if (!pacienteEliminado) {
                return res.status(404).json({ error: 'Paciente no encontrado.' });
            }
            res.status(204).json(); // Sin contenido
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el paciente.' });
        }
    }
}

module.exports = PacienteController;