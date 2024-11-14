const Turno = require('../models/turno'); // Ajusta según tu estructura

class TurnoController {
  // Crear un nuevo turno
  async create(req, res) {
    const { fecha_hora, estado, motivo_consulta, paciente_id, medico_id, especialidad_id, agenda_id } = req.body;
    try {
      const newTurno = await Turno.create({
        fecha_hora,
        estado,
        motivo_consulta,
        paciente_id,
        medico_id,
        especialidad_id,
        agenda_id
      });
      res.status(201).json(newTurno);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el turno' });
    }
  }

  // Obtener todos los turnos
  async getAll(req, res) {
    try {
      const turnos = await Turno.findAll({
        include: [{ model: Paciente }, { model: Medico }, { model: Especialidad }, { model: Agenda }] // Asegúrate de que estos modelos estén definidos y asociados correctamente
      });
      res.status(200).json(turnos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los turnos' });
    }
  }

  // Obtener un turno por ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const turno = await Turno.findByPk(id, {
        include: [{ model: Paciente }, { model: Medico }, { model: Especialidad }, { model: Agenda }]
      });
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
    const { fecha_hora, estado, motivo_consulta, paciente_id, medico_id, especialidad_id, agenda_id } = req.body;
    try {
      const [updated] = await Turno.update({
        fecha_hora,
        estado,
        motivo_consulta,
        paciente_id,
        medico_id,
        especialidad_id,
        agenda_id
      }, {
        where: { id_turno: id }
      });
      if (!updated) {
        return res.status(404).json({ error: 'Turno no encontrado' });
      }
      const updatedTurno = await Turno.findByPk(id);
      res.status(200).json(updatedTurno);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el turno' });
    }
  }

  // Eliminar un turno
  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedCount = await Turno.destroy({
        where: { id_turno: id }
      });
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