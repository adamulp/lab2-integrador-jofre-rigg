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
      Paciente.belongsTo(models.Usuario, {
        foreignKey: 'idUsuario',  
        as: 'usuario',            
      });
    }
  }
  Paciente.init({
    idPaciente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombreCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 20],
      },
    },
    informacionContacto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    obraSocial: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'pacientes', 
    timestamps: false,
  });
  return Paciente;
};