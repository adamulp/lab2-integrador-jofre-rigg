// controllers/agendaController.js
const { Agenda, Medico, Especialidad } = require('../models');

class AgendaController {
  // Crear una nueva agenda
  async create(req, res) {
    const { clasificacion, estado, medicoId, especialidadId } = req.body;

    try {
      // Validar si el médico existe
      const medico = await Medico.findByPk(medicoId);
      if (!medico) {
        return res.status(400).json({ error: 'Médico no encontrado' });
      }

      // Validar si la especialidad existe
      const especialidad = await Especialidad.findByPk(especialidadId);
      if (!especialidad) {
        return res.status(400).json({ error: 'Especialidad no encontrada' });
      }

      const newAgenda = await Agenda.create({
        clasificacion,
        estado,
        medicoId,
        especialidadId // Incluye especialidadId aquí
      });
      res.status(201).json(newAgenda);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la agenda' });
    }
  }

  // Obtener todas las agendas
  async getAll(req, res) {
    try {
      const agendas = await Agenda.findAll({
        include: [
          { model: Medico },
          { model: Especialidad }
        ]
      });
      res.status(200).json(agendas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las agendas' });
    }
  }

  // Obtener una agenda por ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const agenda = await Agenda.findByPk(id, {
        include: [
          { model: Medico },
          { model: Especialidad }
        ]
      });
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

    try {
      // Validar si el médico existe
      const medico = await Medico.findByPk(medicoId);
      if (!medico) {
        return res.status(400).json({ error: 'Médico no encontrado' });
      }

      // Validar si la especialidad existe
      const especialidad = await Especialidad.findByPk(especialidadId);
      if (!especialidad) {
        return res.status(400).json({ error: 'Especialidad no encontrada' });
      }

      const [updated] = await Agenda.update(
        {
          clasificacion,
          estado,
          medicoId,
          especialidadId // Incluye especialidadId aquí
        },
        {
          where: { id },
        }
      );

      if (!updated) {
        return res.status(404).json({ error: 'Agenda no encontrada' });
      }

      const updatedAgenda = await Agenda.findByPk(id);
      res.status(200).json(updatedAgenda);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la agenda' });
    }
  }

  // Eliminar una agenda
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedCount = await Agenda.destroy({
        where: { id }
      });

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
      const agendas = await Agenda.findAll({
        where: { especialidadId },
        include: [{ model: Medico }]
      });

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