// models/Especialidad.js
const { Model } = require('objection');

class Especialidad extends Model {
  static get tableName() {
    return 'especialidades';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nombre'],

      properties: {
        id: { type: 'integer' },
        nombre: { type: 'string', minLength: 1, maxLength: 255 }
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
          from: 'especialidades.id',
          to: 'turnos.especialidadId'
        }
      }
    };
  }
}

module.exports = Especialidad;
