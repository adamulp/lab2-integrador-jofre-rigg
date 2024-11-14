'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('especialidades', { // Change to lowercase
      idEspecialidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 255], // Aseguramos que el nombre tenga entre 1 y 255 caracteres
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('especialidades'); // Change to lowercase
  }
};