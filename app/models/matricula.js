'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matricula extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Matricula.belongsTo(models.Medico, {
        foreignKey: 'idMedico',
        targetKey: 'idMedico',
        as: 'medico',
      });

      // Relación con el modelo Especialidad
      Matricula.belongsTo(models.Especialidad, {
        foreignKey: 'idEspecialidad',
        targetKey: 'idEspecialidad',
        as: 'especialidad',
      });
    }
  }
  Matricula.init({
    idMatricula: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idMedico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Medicos', 
        key: 'idMedico',  
      },
    },
    idEspecialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Especialidades', 
        key: 'idEspecialidad',  
      },
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
  }, {
    sequelize,
    modelName: 'Matricula',
    tableName: (() => {
      switch (process.env.NODE_ENV) {
        case 'production':
          return `${process.env.DB_NAME_PROD}.matriculas`; // Para producción
        case 'test':
          return `${process.env.DB_NAME_TEST}.matriculas`; // Para testing
        case 'development':
          return 'matriculas'; // Para desarrollo (local)
      }
    })(),
    timestamps: false,
  });
  return Matricula;
};