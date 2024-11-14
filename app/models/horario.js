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
      Horario.belongsTo(models.Medico, {
        foreignKey: 'idMedico',
        targetKey: 'idMedico',
        as: 'medico',
      });

      // Relación con el modelo Turno
      Horario.hasMany(models.Turno, {
        foreignKey: 'idHorario',
        sourceKey: 'idHorario',
        as: 'turnos',
      });
    }
  }
  Horario.init({
    idHorario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clasificacion: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    disponibleDesde: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    disponibleHasta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idMedico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Medicos', 
        key: 'idMedico',  
      },
    },
  }, {
    sequelize,
    modelName: 'Horario',
    tableName: (() => {
      switch (process.env.NODE_ENV) {
        case 'production':
          return `${process.env.DB_NAME_PROD}.horarios`; // Para producción
        case 'test':
          return `${process.env.DB_NAME_TEST}.horarios`; // Para testing
        case 'development':
          return 'horarios'; // Para desarrollo (local)
      }
    })(), 
    timestamps: false,
  });
  return Horario;
};