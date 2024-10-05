require('dotenv').config();

const dbConfig = {
  sqlite3: {
    client: 'sqlite3',
    connection: {
      filename: './agenda_consultas.db'
    },
    useNullAsDefault: true
  },
  mariadb: {
    client: 'mariadb',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'your_username',
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_NAME || 'agenda_consultas'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

module.exports = dbConfig[process.env.DB_CLIENT || 'sqlite3'];