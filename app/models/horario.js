'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Horario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Horario.init({
    idHorario: DataTypes.INTEGER,
    clasificacion: DataTypes.STRING,
    estado: DataTypes.STRING,
    disponibleDesde: DataTypes.DATE,
    disponibleHasta: DataTypes.DATE,
    idMedico: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Horario',
  });
  return Horario;
};