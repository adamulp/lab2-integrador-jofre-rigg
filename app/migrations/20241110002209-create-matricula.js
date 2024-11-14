'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matriculas', {
      idMatricula: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idMedico: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idEspecialidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      matricula: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // La matrícula debe ser única
      },
    });

  },
  async down(queryInterface, Sequelize) {
    // Eliminar la tabla 'Matriculas'
    await queryInterface.dropTable('Matriculas');
  }
};