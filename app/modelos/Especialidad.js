// models/Especialidad.js
const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
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
      len: [1, 255], 
    },
  },
}, {
  sequelize, 
  modelName: 'Especialidad',
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
