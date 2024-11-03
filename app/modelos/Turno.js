// models/Turno.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que este archivo exporte la instancia de Sequelize

class Turno extends Model {}

// Definición del modelo
Turno.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fechaHora: {
    type: DataTypes.DATE, // Se recomienda usar el tipo DATE para fechas y horas
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('Reservado', 'Confirmado', 'Cancelado'),
    allowNull: false,
  },
  motivoConsulta: {
    type: DataTypes.STRING,
  },
  pacienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pacientes', // Nombre de la tabla de referencia
      key: 'id', // Llave primaria en la tabla de referencia
    },
  },
  medicoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'medicos',
      key: 'id',
    },
  },
  especialidadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'especialidades',
      key: 'id',
    },
  },
  agendaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'agendas',
      key: 'id',
    },
  },
}, {
  sequelize, // La instancia de Sequelize
  modelName: 'Turno',
  tableName: 'turnos',
  timestamps: false, // Si no quieres que Sequelize agregue campos de timestamps (createdAt, updatedAt)
});

// Relación con los modelos
Turno.associate = (models) => {
  Turno.belongsTo(models.Paciente, {
    foreignKey: 'pacienteId',
    targetKey: 'id',
  });
  Turno.belongsTo(models.Medico, {
    foreignKey: 'medicoId',
    targetKey: 'id',
  });
  Turno.belongsTo(models.Especialidad, {
    foreignKey: 'especialidadId',
    targetKey: 'id',
  });
  Turno.belongsTo(models.Agenda, {
    foreignKey: 'agendaId',
    targetKey: 'id',
  });
};

module.exports = Turno;
