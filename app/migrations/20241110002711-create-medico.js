'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medicos', {
      idMedico: {
        type: Sequelize.INTEGER,
        autoIncrement: true,  // Hacer que 'idMedico' sea auto-incremental
        primaryKey: true,     // Definir como clave primaria
        allowNull: false
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nombreCompleto: {
        type: Sequelize.STRING,
        allowNull: false,  // El nombre no puede ser nulo
        validate: {
          len: [1, 255],  // Validación de longitud para el nombre
        }
      },
      numeroMatricula: {
        type: Sequelize.STRING,
        allowNull: false,  // No puede ser nulo
      },
    });

      },
  async down(queryInterface, Sequelize) {


    // Eliminar la tabla 'Medicos'
    await queryInterface.dropTable('medicos');
  }
};