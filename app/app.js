const express = require('express');
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development' || process.env.HOSTNAME === 'localhost') {
    console.log('Running in development mode');}
else {
    console.log('Running in production mode');
}

const bodyParser = require('body-parser');
const path = require('path');
const Knex = require('knex');
const { Model } = require('objection');

// Load Knex configuration
const knexConfig = require('./knexfile');

// Initialize Knex instance
const knex = Knex(knexConfig);

// Bind Objection.js models to Knex
Model.knex(knex);

const Paciente = require('./modelos/Paciente'); // Import the Paciente model

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (compiled CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Define a route for the pacientes form (read from DB)
app.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.query(); // Fetch all Pacientes
    res.render('pacientes', { pacientes });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route for pacientes page
app.get('/pacientes', (req, res) => {
  res.render('pacientes');
});


// Handle POST request for creating a new paciente
app.post('/paciente/create', async (req, res) => {
  try {
    const { nombreCompleto, dni, contacto, obraSocial } = req.body;
    await Paciente.query().insert({
      nombreCompleto,
      dni,
      contacto,
      obraSocial
    });
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Handle POST request to delete a paciente
app.post('/paciente/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Paciente.query().deleteById(id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
