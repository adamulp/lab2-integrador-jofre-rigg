'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.hasMany(models.Turno, {
        foreignKey: 'idPaciente',  
        as: 'turnos',
      });

      // Relación con el Médico (si el Usuario es un Médico)
      Usuario.hasOne(models.Medico, {
        foreignKey: 'idUsuario', 
        as: 'medico',  
        allowNull: true,  
      });

      // Relación con el Paciente (si el Usuario es un Paciente)
      Usuario.hasOne(models.Paciente, {
        foreignKey: 'idUsuario', 
        as: 'paciente',  
        allowNull: true,  
      });
    
    Usuario.belongsTo(models.Rol, {
      foreignKey: 'idRol',
      targetKey: 'idRol',
      as: 'rol',  // Alias para la relación
    });
  }
  }
  Usuario.init({
    idUsuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    idRol: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: (() => {
      switch (process.env.NODE_ENV) {
        case 'production':
          return `${process.env.DB_NAME_PROD}.usuarios`; // Para producción
        case 'test':
          return `${process.env.DB_NAME_TEST}.usuarios`; // Para testing
        case 'development':
          return 'usuarios'; // Para desarrollo (local)
      }
    })(), 
    timestamps: false,
  });
  return Usuario;
};