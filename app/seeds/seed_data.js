exports.seed = async function(knex) {
    // Check and create the tables if they don't exist
    await knex.schema.hasTable('pacientes').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('pacientes', function(table) {
          table.increments('id').primary();
          table.string('nombreCompleto').notNullable();
          table.string('dni').notNullable().unique();
          table.string('contacto');
          table.string('obraSocial');
        });
      }
    });
  
    await knex.schema.hasTable('medicos').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('medicos', function(table) {
          table.increments('id').primary();
          table.string('nombreCompleto').notNullable();
          table.string('numeroMatricula').notNullable().unique();
        });
      }
    });
  
    await knex.schema.hasTable('especialidades').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('especialidades', function(table) {
          table.increments('id').primary();
          table.string('nombre').notNullable();
        });
      }
    });
  
    await knex.schema.hasTable('agendas').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('agendas', function(table) {
          table.increments('id').primary();
          table.string('clasificacion').notNullable();
          table.string('estado').notNullable();
          table.integer('medicoId').unsigned().references('id').inTable('medicos').onDelete('CASCADE');
        });
      }
    });
  
    await knex.schema.hasTable('turnos').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('turnos', function(table) {
          table.increments('id').primary();
          table.dateTime('fechaHora').notNullable();
          table.string('estado').notNullable();
          table.string('motivoConsulta');
          table.integer('pacienteId').unsigned().references('id').inTable('pacientes').onDelete('CASCADE');
          table.integer('medicoId').unsigned().references('id').inTable('medicos').onDelete('CASCADE');
          table.integer('especialidadId').unsigned().references('id').inTable('especialidades').onDelete('CASCADE');
          table.integer('agendaId').unsigned().references('id').inTable('agendas').onDelete('CASCADE');
        });
      }
    });
  
    // Now that the tables exist, you can delete existing data and insert seed data
    await knex('turnos').del();
    await knex('agendas').del();
    await knex('especialidades').del();
    await knex('medicos').del();
    await knex('pacientes').del();
  
    // Insert Pacientes
    const pacienteIds = await knex('pacientes').insert([
      {
        nombreCompleto: 'Juan Pérez',
        dni: '12345678',
        contacto: 'juan.perez@example.com',
        obraSocial: 'OSDE'
      },
      {
        nombreCompleto: 'Maria Gomez',
        dni: '87654321',
        contacto: 'maria.gomez@example.com',
        obraSocial: 'Swiss Medical'
      }
    ]).returning('id');
  
    // Insert Medicos
    const medicoIds = await knex('medicos').insert([
      {
        nombreCompleto: 'Dr. Carlos López',
        numeroMatricula: 'M12345'
      },
      {
        nombreCompleto: 'Dra. Ana Fernández',
        numeroMatricula: 'M67890'
      }
    ]).returning('id');
  
    // Insert Especialidades
    const especialidadIds = await knex('especialidades').insert([
      { nombre: 'Cardiología' },
      { nombre: 'Neurología' }
    ]).returning('id');
  
    // Insert Agendas for Medicos
    const agendaIds = await knex('agendas').insert([
      {
        clasificacion: 'Normal',
        estado: 'Disponible',
        medicoId: medicoIds[0]  // Dr. Carlos López
      },
      {
        clasificacion: 'VIP',
        estado: 'Disponible',
        medicoId: medicoIds[1]  // Dra. Ana Fernández
      }
    ]).returning('id');
  
    // Insert Turnos (Appointments)
    await knex('turnos').insert([
      {
        fechaHora: '2024-10-10 09:00:00',
        estado: 'Reservado',
        motivoConsulta: 'Chequeo general',
        pacienteId: pacienteIds[0],  // Juan Pérez
        medicoId: medicoIds[0],  // Dr. Carlos López
        especialidadId: especialidadIds[0],  // Cardiología
        agendaId: agendaIds[0]  // Dr. López's agenda
      },
      {
        fechaHora: '2024-10-11 11:00:00',
        estado: 'Reservado',
        motivoConsulta: 'Consulta neurológica',
        pacienteId: pacienteIds[1],  // Maria Gomez
        medicoId: medicoIds[1],  // Dra. Ana Fernández
        especialidadId: especialidadIds[1],  // Neurología
        agendaId: agendaIds[1]  // Dra. Fernández's agenda
      }
    ]);
  };
  