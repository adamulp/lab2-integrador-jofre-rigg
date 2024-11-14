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
      Sobreturno.belongsTo(models.Horario, {
        foreignKey: 'idHorario',
        targetKey: 'idHorario',
        as: 'horario', // Alias para acceder al horario relacionado
      });
    }
  }
  Sobreturno.init({
    idSobreturno: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    maxSobreturnos: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    idHorario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'horarios', 
        key: 'idHorario',  
      },
    },
  }, {
    sequelize,
    modelName: 'Sobreturno',
    tableName: 'sobreturnos',  
    timestamps: false,
  });
  return Sobreturno;
};