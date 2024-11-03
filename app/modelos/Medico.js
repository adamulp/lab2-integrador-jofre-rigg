// models/Medico.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que este archivo exporte la instancia de Sequelize

class Medico extends Model {}

// Definición del modelo
Medico.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombreCompleto: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255], // Longitud mínima y máxima
    },
  },
  numeroMatricula: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 50], // Longitud mínima y máxima
    },
  },
}, {
  sequelize, // La instancia de Sequelize
  modelName: 'Medico',
  tableName: 'medicos',
  timestamps: false, // Si no quieres que Sequelize agregue campos de timestamps (createdAt, updatedAt)
});

// Relación con los modelos Turno y Agenda
Medico.associate = (models) => {
  Medico.hasMany(models.Turno, {
    foreignKey: 'medicoId',
    sourceKey: 'id',
  });
  Medico.hasMany(models.Agenda, {
    foreignKey: 'medicoId',
    sourceKey: 'id',
  });
};

module.exports = Medico;
