
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('turnos', { // Change to lowercase
      idTurno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha_hora: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      motivo_consulta: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pacientes', // Nombre de la tabla de pacientes
          key: 'idPaciente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      medico_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'medicos', // Nombre de la tabla de médicos
          key: 'idMedico',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      especialidad_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'especialidades', // Nombre de la tabla de especialidades
          key: 'idEspecialidad',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      agenda_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'agendas', // Nombre de la tabla de agendas
          key: 'idAgenda',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('turnos'); // Change to lowercase
  }
};