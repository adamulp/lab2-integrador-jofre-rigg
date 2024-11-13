'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medico.belongsTo(models.Usuario, {
        foreignKey: 'idUsuario', // Llave foránea en Medico
        as: 'usuario',            // Alias para acceder a la relación
      });

      Medico.hasMany(models.Turno, {
        foreignKey: 'idMedico',
        sourceKey: 'idMedico',  
      });
      Medico.hasMany(models.Horario, {
        foreignKey: 'idMedico',
        sourceKey: 'idMedico',
      });
    }
  }
  
  Medico.init({
    idMedico: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
    idUsuario: { 
      type:DataTypes.INTEGER,
    },
    nombreCompleto: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    numeroMatricula: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Medico',
    tableName: 'medicos',
    timestamps: false,
  });
  return Medico;
};