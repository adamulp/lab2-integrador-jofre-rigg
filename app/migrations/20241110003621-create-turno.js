'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Turnos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idTurno: {
        type: Sequelize.INTEGER
      },
      fechaHora: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.STRING
      },
      motivoConsulta: {
        type: Sequelize.STRING
      },
      creadoEn: {
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
      idHorario: {
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
    await queryInterface.dropTable('Turnos');
  }
};