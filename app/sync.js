// sync.js
const sequelize = require('./config/database'); // Asegúrate de que la ruta sea correcta
const { usuario, rol, rbac,especialidad, medico, paciente, horario,sobreturno,turno,listaespera,matricula } = require('./models'); // Asegúrate de que la ruta sea correcta también

async function syncDatabase() {
  try {
    console.log('Sincronizando la base de datos...');
    await sequelize.sync({ force: true });  // `force: true` eliminará y recreará las tablas
    console.log('Base de datos sincronizada');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

syncDatabase();