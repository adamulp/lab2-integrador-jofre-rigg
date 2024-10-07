// controllers/TurnoController.js
const Turno = require('../models/Turno');

class TurnoController {
  // Crear un nuevo turno
  async create(req, res) {
    const { fechaHora, estado, motivoConsulta, pacienteId, medicoId, especialidadId, agendaId } = req.body;
    try {
      const newTurno = await Turno.query().insert({
        fechaHora,
        estado,
        motivoConsulta,
        pacienteId,
        medicoId,
        especialidadId,
        agendaId
      });
      res.status(201).json(newTurno);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el turno' });
    }
  }

  // Obtener todos los turnos
  async getAll(req, res) {
    try {
      const turnos = await Turno.query().withGraphFetched('[paciente, medico, especialidad, agenda]');
      res.status(200).json(turnos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los turnos' });
    }
  }

  // Obtener un turno por ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const turno = await Turno.query().findById(id).withGraphFetched('[paciente, medico, especialidad, agenda]');
      if (!turno) {
        return res.status(404).json({ error: 'Turno no encontrado' });
      }
      res.status(200).json(turno);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el turno' });
    }
  }

  // Actualizar un turno
  async update(req, res) {
    const { id } = req.params;
    const { fechaHora, estado, motivoConsulta, pacienteId, medicoId, especialidadId, agendaId } = req.body;
    try {
      const updatedTurno = await Turno.query().patchAndFetchById(id, {
        fechaHora,
        estado,
        motivoConsulta,
        pacienteId,
        medicoId,
        especialidadId,
        agendaId
      });
      if (!updatedTurno) {
        return res.status(404).json({ error: 'Turno no encontrado' });
      }
      res.status(200).json(updatedTurno);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el turno' });
    }
  }

  // Eliminar un turno
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedCount = await Turno.query().deleteById(id);
      if (!deletedCount) {
        return res.status(404).json({ error: 'Turno no encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el turno' });
    }
  }
}

module.exports = new TurnoController();