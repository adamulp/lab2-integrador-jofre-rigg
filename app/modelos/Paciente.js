// models/Paciente.js
const { Model } = require('objection');

class Paciente extends Model {
  static get tableName() {
    return 'pacientes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nombreCompleto', 'dni'],

      properties: {
        id: { type: 'integer' },
        nombreCompleto: { type: 'string', minLength: 1, maxLength: 255 },
        dni: { type: 'string', minLength: 1, maxLength: 20 },
        contacto: { type: 'string' },
        obraSocial: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Turno = require('./Turno');
    return {
      turnos: {
        relation: Model.HasManyRelation,
        modelClass: Turno,
        join: {
          from: 'pacientes.id',
          to: 'turnos.pacienteId'
        }
      }
    };
  }

    static getPacienteById(id) {
        return this.query().findById(id);
    }
}

module.exports = Paciente;
