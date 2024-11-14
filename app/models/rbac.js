'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rbac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
            // Relación muchos a uno con Usuario
            Rbac.belongsTo(models.Usuario, {
              foreignKey: 'idUsuario',  
              as: 'usuario',            
            });
      
            // Relación muchos a uno con Rol
            Rbac.belongsTo(models.Rol, {
              foreignKey: 'idRol',      
              as: 'rol',                
            });
    }
  }
  Rbac.init({
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'idUsuario',
      },
    },
    idRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'idRole',
      },
    },
  }, {
    sequelize,
    modelName: 'Rbac',
    tableName: (() => {
      switch (process.env.NODE_ENV) {
        case 'production':
          return `${process.env.DB_NAME_PROD}.rbacs`; // Para producción
        case 'test':
          return `${process.env.DB_NAME_TEST}.rbacs`; // Para testing
        case 'development':
          return 'rbacs'; // Para desarrollo (local)
      }
    })(),  
    timestamps: false,
  });
  return Rbac;
};