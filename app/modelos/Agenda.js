// models/Agenda.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que este archivo exporte la instancia de Sequelize

class Agenda extends Model {}

// Definición del modelo
Agenda.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clasificacion: {
    type: DataTypes.ENUM('Normal', 'Especial', 'VIP'),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('Disponible', 'No disponible'),
    allowNull: false,
  },
  medicoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'medicos', // Nombre de la tabla de referencia
      key: 'id', // Llave primaria en la tabla de referencia
    },
  },
}, {
  sequelize, // La instancia de Sequelize
  modelName: 'Agenda',
  tableName: 'agendas',
  timestamps: false, // Si no quieres que Sequelize agregue campos de timestamps (createdAt, updatedAt)
});

// Relación con el modelo Medico
Agenda.associate = (models) => {
  Agenda.belongsTo(models.Medico, {
    foreignKey: 'medicoId',
    targetKey: 'id',
  });
  Agenda.hasMany(models.Turno, {
    foreignKey: 'agendaId',
    sourceKey: 'id',
  });
};

module.exports = Agenda;
