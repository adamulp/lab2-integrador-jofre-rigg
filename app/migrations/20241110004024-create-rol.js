'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rols', {
      idRol: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,  // Establecer idRole como auto incremental
        primaryKey: true, 
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rols');
  }
};