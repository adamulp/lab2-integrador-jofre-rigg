// models/Agenda.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que este archivo exporte la instancia de Sequelize

class Agenda extends Model {}

// Definición del modelo
Agenda.init({
  id_agenda: {
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
  disponible_desde: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  disponible_hasta: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  medico_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'medicos', // Nombre de la tabla de referencia
      key: 'id_medico', // Llave primaria en la tabla de referencia
    },
  },
}, {
  sequelize, // La instancia de Sequelize
  modelName: 'Agenda',
  tableName: 'agendas',
  timestamps: false, // Si no quieres que Sequelize agregue campos de timestamps (createdAt, updatedAt)
});

module.exports = (sequelize, DataTypes) => {
  const Agenda = sequelize.define('Agenda', {
      id_agenda: {
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
      disponible_desde: {
        type: DataTypes.DATE, 
        allowNull: false, 
      },
      disponible_hasta: {
        type: DataTypes.DATE, 
        allowNull: false, 
      },
      medico_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'medicos', // Nombre de la tabla de referencia
              key: 'id_medico', // Llave primaria en la tabla de referencia
          },
      },
  }, {
      tableName: 'agendas',
      timestamps: false, // Si no quieres que Sequelize agregue campos de timestamps
  });

  // Relación con el modelo Medico
  Agenda.associate = (models) => {
      Agenda.belongsTo(models.Medico, {
          foreignKey: 'medicoId',
          targetKey: 'id_medico',
      });
      Agenda.hasMany(models.Turno, {
          foreignKey: 'agendaId',
          sourceKey: 'id_agenda',
      });
  };

  return Agenda;
};
