'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Turno.init({
    idTurno: DataTypes.INTEGER,
    fechaHora: DataTypes.DATE,
    estado: DataTypes.STRING,
    motivoConsulta: DataTypes.STRING,
    creadoEn: DataTypes.DATE,
    idPaciente: DataTypes.INTEGER,
    idMedico: DataTypes.INTEGER,
    idEspecialidad: DataTypes.INTEGER,
    idHorario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Turno',
  });
  return Turno;
};