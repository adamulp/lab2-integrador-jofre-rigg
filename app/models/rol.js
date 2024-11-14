'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
            // Relación uno a muchos: un Rol puede estar asociado a muchos Usuarios
            Rol.hasMany(models.Usuario, {
              foreignKey: 'idRol', // La clave foránea en el modelo Usuario
              as: 'usuarios',      // Nombre de la relación
            });
    }
  }
  Rol.init({
    idRol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: (() => {
      switch (process.env.NODE_ENV) {
        case 'production':
          return `${process.env.DB_NAME_PROD}.rols`; // Para producción
        case 'test':
          return `${process.env.DB_NAME_TEST}.rols`; // Para testing
        case 'development':
          return 'rols'; // Para desarrollo (local)
      }
    })(),  
    timestamps: false
  });
  return Rol;
};