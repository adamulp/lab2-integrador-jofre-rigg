'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ListaEsperas', {
      idListaEspera: {
        type: Sequelize.INTEGER,
        autoIncrement: true,  // 'idListaEspera' auto-incremental
        primaryKey: true,     // Definir como clave primaria
        allowNull: false,
      },
      agregadoEn: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      idPaciente: {
        type: Sequelize.INTEGER,
        allowNull: false,     // No puede ser nulo
      },
      idMedico: {
        type: Sequelize.INTEGER,
        allowNull: false,     // No puede ser nulo
      },
      idEspecialidad: {
        type: Sequelize.INTEGER,
        allowNull: false,     // No puede ser nulo
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ListaEsperas');
  }
};