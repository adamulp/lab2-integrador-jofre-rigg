module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pacientes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre_completo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dni: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      contacto: {
        type: Sequelize.STRING,
      },
      obraSocial: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('medicos', {
      id_medico: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre_completo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numeroMatricula: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('especialidades', {
      id_especialidad: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('agendas', {
      id_agenda: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clasificacion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      medico_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'medicos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('turnos', {
      id_turno: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fecha_hora: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      motivoConsulta: {
        type: Sequelize.STRING,
      },
      pacienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pacientes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      medico_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'medicos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      especialidad_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'especialidades',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      agenda_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'agendas',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('turnos');
    await queryInterface.dropTable('agendas');
    await queryInterface.dropTable('especialidades');
    await queryInterface.dropTable('medicos');
    await queryInterface.dropTable('pacientes');
  },
};
  