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
    tableName: 'roles', 
    timestamps: false
  });
  return Rol;
};