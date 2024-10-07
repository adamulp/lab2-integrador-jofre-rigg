// controllers/MedicoController.js
const Medico = require('../models/Medico');

class MedicoController {
    // Crear un nuevo médico
    static async crearMedico(req, res) {
        try {
            const medico = await Medico.query().insert(req.body);
            res.status(201).json(medico);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Obtener todos los médicos
    static async obtenerMedicos(req, res) {
        try {
            const medicos = await Medico.query();
            res.status(200).json(medicos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener un médico por ID
    static async obtenerMedicoPorId(req, res) {
        const { id } = req.params;
        try {
            const medico = await Medico.query().findById(id);
            if (medico) {
                res.status(200).json(medico);
            } else {
                res.status(404).json({ error: 'Médico no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar un médico
    static async actualizarMedico(req, res) {
        const { id } = req.params;
        try {
            const medico = await Medico.query().patchAndFetchById(id, req.body);
            if (medico) {
                res.status(200).json(medico);
            } else {
                res.status(404).json({ error: 'Médico no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Eliminar un médico
    static async eliminarMedico(req, res) {
        const { id } = req.params;
        try {
            const medico = await Medico.query().deleteById(id);
            if (medico) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Médico no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MedicoController;