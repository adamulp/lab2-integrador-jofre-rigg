'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('turnos', {
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
        allowNull: false,
        references: {
          model: 'pacientes', // Ensure this matches the table name
          key: 'idPaciente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idMedico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'medicos', // Ensure this matches the table name
          key: 'idMedico',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idEspecialidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'especialidades', // Ensure this matches the table name
          key: 'idEspecialidad',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idHorario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'horarios', // Ensure this matches the table name
          key: 'idHorario',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('turnos');
  }
};