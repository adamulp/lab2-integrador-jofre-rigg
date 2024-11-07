// models/Turno.js
const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
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
  sequelize, 
  modelName: 'Turno',
  tableName: 'turnos',
  timestamps: false, 
});




// Relación con los modelos
Turno.associate = (models) => {
  Turno.belongsTo(models.Paciente, {
    foreignKey: 'paciente_id',
    targetKey: 'id_paciente',
  });
  Turno.belongsTo(models.Medico, {
    foreignKey: 'medico_id',
    targetKey: 'id_medico',
  });
  Turno.belongsTo(models.Especialidad, {
    foreignKey: 'especialidad_id',
    targetKey: 'id_especialidad',
  });
  Turno.belongsTo(models.Agenda, {
    foreignKey: 'agenda_id',
    targetKey: 'id_agenda',
  });
};

return Turno;
};