// models/Turno.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que este archivo exporte la instancia de Sequelize

class Turno extends Model {}

// Definición del modelo
Turno.init({
  id_turno: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha_hora: {
    type: DataTypes.DATE, 
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  motivo_consulta: {
    type: DataTypes.TEXT,
  },
  paciente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pacientes', // Nombre de la tabla de referencia
      key: 'id_paciente', // Llave primaria en la tabla de referencia
    },
  },
  medico_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'medicos',
      key: 'id_medico',
    },
  },
  especialidad_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'especialidades',
      key: 'id_especialidad',
    },
  },
  agenda_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'agendas',
      key: 'id_agenda',
    },
  },
}, {
  sequelize, // La instancia de Sequelize
  modelName: 'Turno',
  tableName: 'turnos',
  timestamps: false, // Si no quieres que Sequelize agregue campos de timestamps (createdAt, updatedAt)
});

module.exports = (sequelize, DataTypes) => {
  const Turno = sequelize.define('Turno', {
    id_turno: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha_hora: { 
      type: DataTypes.DATE, 
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(50),
        allowNull: false,
    motivo_consulta: { 
      type: DataTypes.TEXT,
      allowNull: true, 
    },
    creado_en: { 
      type: DataTypes.DATE, 
      allowNull: false, 
      defaultValue: DataTypes.NOW, 
    },
    medico_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medicos', 
        key: 'id_medico', 
      },
    },
    paciente_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pacientes', 
        key: 'id_paciente', 
      },
    },
    especialidad_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'especialidades', 
        key: 'id_especialidad', 
      },
    },
    agenda_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'agendas', 
        key: 'id_agenda', 
      },
    },
  },  
  },  {
    tableName: 'turnos', 
    timestamps: false, 
  });

// Relación con los modelos
Turno.associate = (models) => {
  Turno.belongsTo(models.Paciente, {
    foreignKey: 'pacienteId',
    targetKey: 'id_paciente',
  });
  Turno.belongsTo(models.Medico, {
    foreignKey: 'medicoId',
    targetKey: 'id_medico',
  });
  Turno.belongsTo(models.Especialidad, {
    foreignKey: 'especialidadId',
    targetKey: 'id_especialidad',
  });
  Turno.belongsTo(models.Agenda, {
    foreignKey: 'agendaId',
    targetKey: 'id_agenda',
  });
};

return Turno;
};