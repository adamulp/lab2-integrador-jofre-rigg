### Estructura del Directorio App

El directorio `app` contiene el código principal de la aplicación y archivos relacionados. A continuación, se describe en detalle su contenido:

- `.env`: Archivo de configuración local del entorno (no se sube al repo)
- `app.js`: El punto de entrada principal de la aplicación.
- `knexfile.js`: Archivo de configuración para Knex.js, utilizado para migraciones y semillas de la base de datos.
- `migrations/`: Directorio que contiene archivos de migración de la base de datos.
  - `20241005022427_create_agenda_de_consultas_tables.js`: Archivo de migración para crear las tablas de agenda de consultas.
- `modelos/`: Directorio que contiene las definiciones de los modelos.
- `public/`: Directorio que contiene activos públicos como hojas de estilo.
- `seeds/`: Directorio que contiene archivos de seed data para la base de datos.
  - `seed_data.js`: Archivo de datos de semillas para poblar la base de datos con datos iniciales.
- `views/`: Directorio que contiene plantillas Pug para renderizar HTML.
- `agenda_consultas.db`: Base de datos de prueba (SQLite)
