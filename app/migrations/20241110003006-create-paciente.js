'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pacientes', {
      idPaciente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,  // 'idPaciente' es auto-incremental
        primaryKey: true, 
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,  // No permite null
      },
      nombreCompleto: {
        type: Sequelize.STRING,
        allowNull: false,  // No puede ser nulo
        validate: {
          len: [1, 255],  // Validación de longitud del nombre
        }
      },
      dni: {
        type: Sequelize.STRING,
        allowNull: false,  // No puede ser nulo
        unique: true,      // El DNI debe ser único
        validate: {
          len: [1, 20],  // Validación de longitud para el DNI
        }
      },
      informacionContacto: {
        type: Sequelize.TEXT,
        allowNull: false,  // No puede ser nulo
      },
      obraSocial: {
        type: Sequelize.STRING(255),
        allowNull: true,   // Puede ser nulo
      },
    });

  },
  async down(queryInterface, Sequelize) {


    // Eliminar la tabla 'Pacientes'
    await queryInterface.dropTable('pacientes');
  }
};