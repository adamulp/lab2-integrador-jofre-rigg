// models/Agenda.js
const { Model } = require('objection');

class Agenda extends Model {
  static get tableName() {
    return 'agendas';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['clasificacion', 'estado', 'medicoId'],

      properties: {
        id: { type: 'integer' },
        clasificacion: { type: 'string', enum: ['Normal', 'Especial', 'VIP'] },
        estado: { type: 'string', enum: ['Disponible', 'No disponible'] },
        medicoId: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    const Medico = require('./Medico');
    const Turno = require('./Turno');
    return {
      medico: {
        relation: Model.BelongsToOneRelation,
        modelClass: Medico,
        join: {
          from: 'agendas.medicoId',
          to: 'medicos.id'
        }
      },
      turnos: {
        relation: Model.HasManyRelation,
        modelClass: Turno,
        join: {
          from: 'agendas.id',
          to: 'turnos.agendaId'
        }
      }
    };
  }
}

module.exports = Agenda;
