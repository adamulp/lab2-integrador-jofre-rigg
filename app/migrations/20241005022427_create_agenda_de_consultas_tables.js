exports.up = async function(knex) {
    await knex.schema.createTable('pacientes', function(table) {
      table.increments('id').primary();
      table.string('nombreCompleto').notNullable();
      table.string('dni').notNullable().unique();
      table.string('contacto');
      table.string('obraSocial');
    });
  
    await knex.schema.createTable('medicos', function(table) {
      table.increments('id').primary();
      table.string('nombreCompleto').notNullable();
      table.string('numeroMatricula').notNullable().unique();
    });
  
    await knex.schema.createTable('especialidades', function(table) {
      table.increments('id').primary();
      table.string('nombre').notNullable();
    });
  
    await knex.schema.createTable('agendas', function(table) {
      table.increments('id').primary();
      table.string('clasificacion').notNullable();
      table.string('estado').notNullable();
      table.integer('medicoId').unsigned().references('id').inTable('medicos').onDelete('CASCADE');
    });
  
    await knex.schema.createTable('turnos', function(table) {
      table.increments('id').primary();
      table.dateTime('fechaHora').notNullable();
      table.string('estado').notNullable();
      table.string('motivoConsulta');
      table.integer('pacienteId').unsigned().references('id').inTable('pacientes').onDelete('CASCADE');
      table.integer('medicoId').unsigned().references('id').inTable('medicos').onDelete('CASCADE');
      table.integer('especialidadId').unsigned().references('id').inTable('especialidades').onDelete('CASCADE');
      table.integer('agendaId').unsigned().references('id').inTable('agendas').onDelete('CASCADE');
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('turnos');
    await knex.schema.dropTableIfExists('agendas');
    await knex.schema.dropTableIfExists('especialidades');
    await knex.schema.dropTableIfExists('medicos');
    await knex.schema.dropTableIfExists('pacientes');
  };
  