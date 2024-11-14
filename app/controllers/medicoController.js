const Medico = require('../models/Medico'); // Asegúrate de que la ruta sea correcta

class MedicoController {
    // Crear un nuevo médico
    static async crearMedico(req, res) {
        try {
            const medico = await Medico.create(req.body);
            res.status(201).json(medico);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Obtener todos los médicos
    static async obtenerMedicos(req, res) {
        try {
          return await Medico.findAll({ attributes: ['nombreCompleto'] });
        } catch (error) {
          console.error("Error al obtener los médicos:", error);
          throw new Error('Error al obtener los médicos');
        }
      }

    // Obtener un médico por ID
    static async obtenerMedicoPorId(req, res) {
        const { id } = req.params;
        try {
            const medico = await Medico.findByPk(id);
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
            const [updated] = await Medico.update(req.body, {
                where: { idMedico: id }
            });
            if (updated) {
                const updatedMedico = await Medico.findByPk(id);
                res.status(200).json(updatedMedico);
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
            const deletedCount = await Medico.destroy({
                where: { idMedico: id }
            });
            if (deletedCount) {
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