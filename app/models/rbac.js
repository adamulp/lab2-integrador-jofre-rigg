'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rbac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rbac.init({
    idUsuario: DataTypes.INTEGER,
    idRol: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rbac',
  });
  return Rbac;
};