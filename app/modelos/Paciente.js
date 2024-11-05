// models/Paciente.js
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {

class Paciente extends Model {}

// Definición del modelo
Paciente.init({
  id_paciente: {
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
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 20],
    },
  },
  informacion_contacto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  obra_social: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  sequelize, 
  modelName: 'Paciente',
  tableName: 'pacientes',
  timestamps: false, 
});


// Relación con el modelo Turno
Paciente.associate = (models) => {
  Paciente.hasMany(models.Turno, {
    foreignKey: 'paciente_id',
    sourceKey: 'id_paciente',
  });
};

return Paciente;
};