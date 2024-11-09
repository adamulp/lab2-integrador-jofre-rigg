### Estructura del Directorio App

El directorio `app` contiene el código principal de la aplicación y archivos relacionados. A continuación, se describe en detalle su contenido:

`app.js`: El punto de entrada principal de la aplicación.
`.env`: Archivo de configuración local del entorno (no se sube al repo)
`views/`: Plantillas Pug para renderizar HTML.

  #### Archivos de la base de datos
```bash
npm install --save-dev sequelize-cli
```

`migrations/`: Archivos de migración para crear o recrear la base de datos según un esquema detallado en el javascript.
`20241005022427_create_agenda_de_consultas_tables.js`: Archivo de migración para crear las tablas de agenda de consultas (el timestamp puede variar).

`modelos/`: Definiciones de los modelos.
`seeds/`: Archivos de seed data para la base de datos.
`seed_data.js`: Archivo de datos de semillas para poblar la base de datos con datos iniciales.

`agenda_consultas.db`: Base de datos de prueba (SQLite)


### Ejemplo del contenido del archivo `.env`:

```plaintext
NODE_ENV=development
PORT=3000
DB_CLIENT=mariadb
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=agenda_consultas
```
