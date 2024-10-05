// models/Medico.js
const { Model } = require('objection');

class Medico extends Model {
  static get tableName() {
    return 'medicos';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nombreCompleto', 'numeroMatricula'],

      properties: {
        id: { type: 'integer' },
        nombreCompleto: { type: 'string', minLength: 1, maxLength: 255 },
        numeroMatricula: { type: 'string', minLength: 1, maxLength: 50 }
      }
    };
  }

  static get relationMappings() {
    const Turno = require('./Turno');
    const Agenda = require('./Agenda');
    return {
      turnos: {
        relation: Model.HasManyRelation,
        modelClass: Turno,
        join: {
          from: 'medicos.id',
          to: 'turnos.medicoId'
        }
      },
      agendas: {
        relation: Model.HasManyRelation,
        modelClass: Agenda,
        join: {
          from: 'medicos.id',
          to: 'agendas.medicoId'
        }
      }
    };
  }
}

module.exports = Medico;
