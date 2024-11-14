'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,  // Establecer idUsuario como auto incremental
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      idRol: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};