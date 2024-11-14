'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('horarios', {
      idHorario: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clasificacion: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      estado: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      disponibleDesde: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      disponibleHasta: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      idMedico: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });

      },
  async down(queryInterface, Sequelize) {


    // Eliminar la tabla 'Horarios' si existe
    await queryInterface.dropTable('horarios');
  }
};