// models/Turno.js
const { Model } = require('objection');

class Turno extends Model {
  static get tableName() {
    return 'turnos';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['fechaHora', 'estado', 'pacienteId', 'medicoId'],

      properties: {
        id: { type: 'integer' },
        fechaHora: { type: 'string', format: 'date-time' },
        estado: { type: 'string', enum: ['Reservado', 'Confirmado', 'Cancelado'] },
        motivoConsulta: { type: 'string' },
        pacienteId: { type: 'integer' },
        medicoId: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    const Paciente = require('./Paciente');
    const Medico = require('./Medico');
    const Especialidad = require('./Especialidad');
    const Agenda = require('./Agenda');

    return {
      paciente: {
        relation: Model.BelongsToOneRelation,
        modelClass: Paciente,
        join: {
          from: 'turnos.pacienteId',
          to: 'pacientes.id'
        }
      },
      medico: {
        relation: Model.BelongsToOneRelation,
        modelClass: Medico,
        join: {
          from: 'turnos.medicoId',
          to: 'medicos.id'
        }
      },
      especialidad: {
        relation: Model.BelongsToOneRelation,
        modelClass: Especialidad,
        join: {
          from: 'turnos.especialidadId',
          to: 'especialidades.id'
        }
      },
      agenda: {
        relation: Model.BelongsToOneRelation,
        modelClass: Agenda,
        join: {
          from: 'turnos.agendaId',
          to: 'agendas.id'
        }
      }
    };
  }
}

module.exports = Turno;
