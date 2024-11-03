// models/Paciente.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Paciente extends Model {}

// Definición del modelo
Paciente.init({
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
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 20],
    },
  },
  contacto: {
    type: DataTypes.STRING,
    allowNull: true, // Este campo es opcional
  },
  obraSocial: {
    type: DataTypes.STRING,
    allowNull: true, // Este campo es opcional
  },
}, {
  sequelize, // La instancia de Sequelize
  modelName: 'Paciente',
  tableName: 'pacientes',
  timestamps: false, // Si no quieres que Sequelize agregue campos de timestamps (createdAt, updatedAt)
});

// Relación con el modelo Turno
Paciente.associate = (models) => {
  Paciente.hasMany(models.Turno, {
    foreignKey: 'pacienteId',
    sourceKey: 'id',
  });
};

// Método para obtener un paciente por ID
Paciente.getPacienteById = async (id) => {
  return await Paciente.findByPk(id);
};

module.exports = Paciente;
