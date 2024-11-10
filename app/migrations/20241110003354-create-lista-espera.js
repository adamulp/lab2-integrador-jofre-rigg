'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ListaEsperas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idListaEspera: {
        type: Sequelize.INTEGER
      },
      agregadoEn: {
        type: Sequelize.DATE
      },
      idPaciente: {
        type: Sequelize.INTEGER
      },
      idMedico: {
        type: Sequelize.INTEGER
      },
      idEspecialidad: {
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
    await queryInterface.dropTable('ListaEsperas');
  }
};