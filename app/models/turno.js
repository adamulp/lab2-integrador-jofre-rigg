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
      Turno.belongsTo(models.Paciente, {
        foreignKey: 'idPaciente',
        targetKey: 'idPaciente',
        as: 'paciente',
      });

      // Relación con Medico
      Turno.belongsTo(models.Medico, {
        foreignKey: 'idMedico',
        targetKey: 'idMedico',
        as: 'medico',
      });

      // Relación con Especialidad
      Turno.belongsTo(models.Especialidad, {
        foreignKey: 'idEspecialidad',
        targetKey: 'idEspecialidad',
        as: 'especialidad',
      });

      // Relación con Horario
      Turno.belongsTo(models.Horario, {
        foreignKey: 'idHorario',
        targetKey: 'idHorario',
        as: 'horario',
      });
    }
  }
  Turno.init({
    idTurno: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fechaHora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motivoConsulta: {
      type: DataTypes.STRING, 
    },
    creadoEn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
    },
    idPaciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Pacientes',
        key: 'idPaciente',
      },
    },
    idMedico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Medicos',
        key: 'idMedico',
      },
    },
    idEspecialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Especialidades',
        key: 'idEspecialidad',
      },
    },
    idHorario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Horarios',
        key: 'idHorario',
      },
    },
  }, {
    sequelize,
    modelName: 'Turno',
    tableName: (() => {
      switch (process.env.NODE_ENV) {
        case 'production':
          return `${process.env.DB_NAME_PROD}.turnos`; // Para producción
        case 'test':
          return `${process.env.DB_NAME_TEST}.turnos`; // Para testing
        case 'development':
          return 'turnos'; // Para desarrollo (local)
      }
    })(), 
    timestamps: false,
  });
  return Turno;
};