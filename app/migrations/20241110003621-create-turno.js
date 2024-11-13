'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Turnos', {
      idTurno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Hacer que sea auto-incremental
        allowNull: false
      },
      fechaHora: {
        type: Sequelize.DATE,
        allowNull: false, // No puede ser nula
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: true, // Puede ser nula
      },
      motivoConsulta: {
        type: Sequelize.STRING,
        allowNull: true, // Puede ser nula
      },
      creadoEn: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Establece la fecha y hora actual por defecto
        allowNull: false, // No puede ser nulo
      },
      idPaciente: {
        type: Sequelize.INTEGER,
        allowNull: false, // No puede ser nulo
      },
      idMedico: {
        type: Sequelize.INTEGER,
        allowNull: false, // No puede ser nulo
      },
      idEspecialidad: {
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
    await queryInterface.dropTable('Turnos');
  }
};