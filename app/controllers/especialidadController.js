// controllers/EspecialidadController.js
const Especialidad = require('../models/Especialidad'); // Asegúrate de que la ruta sea correcta

class EspecialidadController {
  // Crear una nueva especialidad
  async create(req, res) {
    const { nombre } = req.body;
    try {
      const newEspecialidad = await Especialidad.create({ nombre });
      res.status(201).json(newEspecialidad);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la especialidad' });
    }
  }

  // Obtener todas las especialidades
  async getAll(req, res) {
    try {
      const especialidades = await Especialidad.findAll();
      res.status(200).json(especialidades);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las especialidades' });
    }
  }

  // Obtener una especialidad por ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const especialidad = await Especialidad.findByPk(id);
      if (!especialidad) {
        return res.status(404).json({ error: 'Especialidad no encontrada' });
      }
      res.status(200).json(especialidad);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la especialidad' });
    }
  }

  // Actualizar una especialidad
  async update(req, res) {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
      const [updated] = await Especialidad.update({ nombre }, {
        where: { id_especialidad: id },
      });
      if (updated) {
        const updatedEspecialidad = await Especialidad.findByPk(id);
        res.status(200).json(updatedEspecialidad);
      } else {
        res.status(404).json({ error: 'Especialidad no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la especialidad' });
    }
  }

  // Eliminar una especialidad
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedCount = await Especialidad.destroy({
        where: { id_especialidad: id },
      });
      if (deletedCount) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Especialidad no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la especialidad' });
    }
  }
}

module.exports = new EspecialidadController();