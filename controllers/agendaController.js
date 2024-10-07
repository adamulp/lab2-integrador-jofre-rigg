// controllers/AgendaController.js
const Agenda = require('../models/Agenda');
const Medico = require('../models/Medico');
const Especialidad = require('../models/Especialidad');

class AgendaController {
  // Crear una nueva agenda
  async create(req, res) {
    const { clasificacion, estado, medicoId, especialidadId } = req.body;

    // Validar si el médico existe
    const medico = await Medico.query().findById(medicoId);
    if (!medico) {
      return res.status(400).json({ error: 'Médico no encontrado' });
    }

    // Validar si la especialidad existe
    const especialidad = await Especialidad.query().findById(especialidadId);
    if (!especialidad) {
      return res.status(400).json({ error: 'Especialidad no encontrada' });
    }

    try {
      const newAgenda = await Agenda.query().insert({
        clasificacion,
        estado,
        medicoId,
        especialidadId, // Incluye especialidadId aquí
      });
      res.status(201).json(newAgenda);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la agenda' });
    }
  }

  // Obtener todas las agendas
  async getAll(req, res) {
    try {
      const agendas = await Agenda.query().withGraphFetched('[medico, especialidad]');
      res.status(200).json(agendas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las agendas' });
    }
  }

  // Obtener una agenda por ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const agenda = await Agenda.query().findById(id).withGraphFetched('[medico, especialidad]');
      if (!agenda) {
        return res.status(404).json({ error: 'Agenda no encontrada' });
      }
      res.status(200).json(agenda);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la agenda' });
    }
  }

  // Actualizar una agenda
  async update(req, res) {
    const { id } = req.params;
    const { clasificacion, estado, medicoId, especialidadId } = req.body;

    // Validar si el médico existe
    const medico = await Medico.query().findById(medicoId);
    if (!medico) {
      return res.status(400).json({ error: 'Médico no encontrado' });
    }

    // Validar si la especialidad existe
    const especialidad = await Especialidad.query().findById(especialidadId);
    if (!especialidad) {
      return res.status(400).json({ error: 'Especialidad no encontrada' });
    }

    try {
      const updatedAgenda = await Agenda.query().patchAndFetchById(id, {
        clasificacion,
        estado,
        medicoId,
        especialidadId, // Incluye especialidadId aquí
      });
      if (!updatedAgenda) {
        return res.status(404).json({ error: 'Agenda no encontrada' });
      }
      res.status(200).json(updatedAgenda);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la agenda' });
    }
  }

  // Eliminar una agenda
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedCount = await Agenda.query().deleteById(id);
      if (!deletedCount) {
        return res.status(404).json({ error: 'Agenda no encontrada' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la agenda' });
    }
  }

  // Obtener agendas por especialidad
  async getByEspecialidad(req, res) {
    const { especialidadId } = req.params;
    try {
      const agendas = await Agenda.query()
        .where('especialidadId', especialidadId)
        .withGraphFetched('medico');

      if (agendas.length === 0) {
        return res.status(404).json({ error: 'No se encontraron agendas para esta especialidad' });
      }

      res.status(200).json(agendas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las agendas' });
    }
  }
}

module.exports = new AgendaController();