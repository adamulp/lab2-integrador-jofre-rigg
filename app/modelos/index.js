// modelos/index.js
const Sequelize = require('sequelize');
const dbConfig = require('../config/database'); // Importa la configuración de la base de datos

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

const Agenda = require('./Agenda')(sequelize);
const Medico = require('./Medico')(sequelize);
const Especialidad = require('./Especialidad')(sequelize);
const Paciente = require('./Paciente')(sequelize);
const Turno = require('./Turno')(sequelize);

module.exports = {
  sequelize,
  Agenda,
  Medico,
  Especialidad,
  Paciente,
  Turno,
};