'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paciente.init({
    idPaciente: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    nombreCompleto: DataTypes.STRING,
    dni: DataTypes.STRING,
    informacionContacto: DataTypes.STRING,
    obraSocial: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paciente',
  });
  return Paciente;
};