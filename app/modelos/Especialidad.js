// models/Especialidad.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que este archivo exporte la instancia de Sequelize

class Especialidad extends Model {}

// Definición del modelo
Especialidad.init({
  id_especialidad: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 255], // Longitud mínima y máxima
    },
  },
}, {
  sequelize, // La instancia de Sequelize
  modelName: 'Especialidad',
  tableName: 'especialidades',
  timestamps: false, 
});


module.exports = (sequelize, DataTypes) => {
  const Especialidad = sequelize.define('Especialidad', {
    id_especialidad: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 100], 
      },
    },
  }, {
    tableName: 'especialidades',
    timestamps: false, 
  });

// Relación con el modelo Turno
Especialidad.associate = (models) => {
  Especialidad.hasMany(models.Turno, {
    foreignKey: 'especialidad_id',
    sourceKey: 'id_especialidad',
  });
};

return Especialidad;
};
