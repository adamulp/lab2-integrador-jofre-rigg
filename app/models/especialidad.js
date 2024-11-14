'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Especialidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Especialidad.hasMany(models.Turno, {
        foreignKey: 'especialidadId', // Clave foránea en Turno
        sourceKey: 'idEspecialidad',   // Clave primaria en Especialidad
        as: 'turnos',                  // Alias para acceder a los turnos de una especialidad
      });
    }
  }
  Especialidad.init({
    idEspecialidad: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        len: [1, 255], 
      },
    },
  }, {
    sequelize,
    modelName: 'Especialidad',
    tableName: 'especialidades', 
    timestamps: false, 
  });
  return Especialidad;
};