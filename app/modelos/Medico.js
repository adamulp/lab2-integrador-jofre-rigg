// models/Medico.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que este archivo exporte la instancia de Sequelize

class Medico extends Model {}

// Definición del modelo
Medico.init({
  id_medico: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255], // Longitud mínima y máxima
    },
  },
//   mail: {
//     type: DataTypes.STRING(30),
//     allowNull: false,
//     unique: true,
//     validate: {
//       len: [1, 50], // Longitud mínima y máxima
//     },
    estado: {
      type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
  },
{
  sequelize, // La instancia de Sequelize
  modelName: 'Medico',
  tableName: 'medicos',
  timestamps: false, // Si no quieres que Sequelize agregue campos de timestamps (createdAt, updatedAt)
});

module.exports = (sequelize, DataTypes) => {
  const Medico = sequelize.define('Medico', {
    id_medico: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_completo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
      estado: {
        type: DataTypes.TINYINT,
          allowNull: false,
          defaultValue: 1,
          field: 'estado',
    },
  },
}, {
    tableName: 'medicos',
    timestamps: false, // Si no quieres que Sequelize agregue campos de timestamps
  });


// Relación con los modelos Turno y Agenda
Medico.associate = (models) => {
  Medico.hasMany(models.Turno, {
    foreignKey: 'medicoId',
    sourceKey: 'id_medico',
  });
  Medico.hasMany(models.Agenda, {
    foreignKey: 'medicoId',
    sourceKey: 'id_medico',
  });
};

return Medico;
};