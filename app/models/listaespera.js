'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListaEspera extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListaEspera.belongsTo(models.Paciente, {
        foreignKey: 'idPaciente',
        targetKey: 'idPaciente',
        as: 'paciente', 
      });

      // Relación con Medico
      ListaEspera.belongsTo(models.Medico, {
        foreignKey: 'idMedico',
        targetKey: 'idMedico',
        as: 'medico', 
      });

      // Relación con Especialidad
      ListaEspera.belongsTo(models.Especialidad, {
        foreignKey: 'idEspecialidad',
        targetKey: 'idEspecialidad',
        as: 'especialidad', 
      });
    }
  }
  ListaEspera.init({
    idListaEspera: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    agregadoEn: {
      type: DataTypes.DATE,
      allowNull: false, 
    },
    idPaciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Pacientes', 
        key: 'idPaciente',  
      },
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
  }, {
    sequelize,
    modelName: 'ListaEspera',
    tableName: 'listasEspera', 
    timestamps: false,
  });
  return ListaEspera;
};