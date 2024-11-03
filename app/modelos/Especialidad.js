// models/Especialidad.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que este archivo exporte la instancia de Sequelize

class Especialidad extends Model {}

// Definición del modelo
Especialidad.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255], // Longitud mínima y máxima
    },
  },
}, {
  sequelize, // La instancia de Sequelize
  modelName: 'Especialidad',
  tableName: 'especialidades',
  timestamps: false, // Si no quieres que Sequelize agregue campos de timestamps (createdAt, updatedAt)
});

// Relación con el modelo Turno
Especialidad.associate = (models) => {
  Especialidad.hasMany(models.Turno, {
    foreignKey: 'especialidadId',
    sourceKey: 'id',
  });
};

module.exports = Especialidad;
