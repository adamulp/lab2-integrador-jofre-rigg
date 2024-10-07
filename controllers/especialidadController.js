// controllers/EspecialidadController.js
const Especialidad = require('../models/Especialidad');

class EspecialidadController {
  // Crear una nueva especialidad
  async create(req, res) {
    const { nombre } = req.body;
    try {
      const newEspecialidad = await Especialidad.query().insert({ nombre });
      res.status(201).json(newEspecialidad);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la especialidad' });
    }
  }

  // Obtener todas las especialidades
  async getAll(req, res) {
    try {
      const especialidades = await Especialidad.query();
      res.status(200).json(especialidades);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las especialidades' });
    }
  }

  // Obtener una especialidad por ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const especialidad = await Especialidad.query().findById(id);
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
      const updatedEspecialidad = await Especialidad.query().patchAndFetchById(id, { nombre });
      if (!updatedEspecialidad) {
        return res.status(404).json({ error: 'Especialidad no encontrada' });
      }
      res.status(200).json(updatedEspecialidad);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la especialidad' });
    }
  }

  // Eliminar una especialidad
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedCount = await Especialidad.query().deleteById(id);
      if (!deletedCount) {
        return res.status(404).json({ error: 'Especialidad no encontrada' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la especialidad' });
    }
  }
}

module.exports = new EspecialidadController();