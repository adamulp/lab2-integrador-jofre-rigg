'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sobreturnos', {
      idSobreturno: {
        type: Sequelize.INTEGER,
        allowNull: false, // No puede ser nulo
      },
      maxSobreturnos: {
        type: Sequelize.INTEGER,
        allowNull: false, // No puede ser nulo
      },
      idHorario: {
        type: Sequelize.INTEGER,
        allowNull: false, // No puede ser nulo
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sobreturnos');
  }
};