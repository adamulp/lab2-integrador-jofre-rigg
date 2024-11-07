// models/Medico.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
      len: [1, 255], 
    },
  },
  mail: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 50], 
    },
    estado: {
      type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
  },
}, {
  sequelize, 
  modelName: 'Medico',
  tableName: 'medicos',
  timestamps: false, 
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