'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rbacs', {
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      idRol: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rbacs');
  }
};