'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sobreturno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sobreturno.init({
    idSobreturno: DataTypes.INTEGER,
    maxSobreturnos: DataTypes.INTEGER,
    idHorario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sobreturno',
  });
  return Sobreturno;
};