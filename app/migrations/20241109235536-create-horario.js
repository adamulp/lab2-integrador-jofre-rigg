'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Horarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idHorario: {
        type: Sequelize.INTEGER
      },
      clasificacion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      disponibleDesde: {
        type: Sequelize.DATE
      },
      disponibleHasta: {
        type: Sequelize.DATE
      },
      idMedico: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Horarios');
  }
};