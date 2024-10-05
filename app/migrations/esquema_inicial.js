exports.up = function (knex) {
    return knex.schema
      .createTable('pacientes', function (table) {
        table.increments('id').primary();
        table.string('nombreCompleto').notNullable();
        table.string('dni').notNullable().unique();
        table.string('contacto');
        table.string('obraSocial');
      })
      .createTable('medicos', function (table) {
        table.increments('id').primary();
        table.string('nombreCompleto').notNullable();
        table.string('numeroMatricula').notNullable().unique();
      })
      .createTable('especialidades', function (table) {
        table.increments('id').primary();
        table.string('nombre').notNullable();
      })
      .createTable('agendas', function (table) {
        table.increments('id').primary();
        table.string('clasificacion').notNullable();
        table.string('estado').notNullable();
        table.integer('medicoId').unsigned().references('id').inTable('medicos').onDelete('CASCADE');
      })
      .createTable('turnos', function (table) {
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
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('turnos')
      .dropTableIfExists('agendas')
      .dropTableIfExists('especialidades')
      .dropTableIfExists('medicos')
      .dropTableIfExists('pacientes');
  };
  