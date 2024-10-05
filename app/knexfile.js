module.exports = {
    client: 'sqlite3',
    connection: {
      filename: './agenda_consultas.db'  // Path to your SQLite database file
    },
    useNullAsDefault: true // Required for SQLite
  };
  