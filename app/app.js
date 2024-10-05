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
    res.render('index', { pacientes });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route for pacientes page
app.get('/pacientes', (req, res) => {
  res.render('pacientes');
});

// Route for horarios page
app.get('/horarios', (req, res) => {
  res.render('horarios');
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

// Handle form submissions for updating schedule
app.post('/horarios/update', (req, res) => {
  const { doctor, dia_cambio, nuevo_horario, fecha_cambio } = req.body;
  // Logic to update doctor's schedule in the database here
  console.log(`Updating schedule for ${doctor} on ${dia_cambio} to ${nuevo_horario} starting from ${fecha_cambio}`);
  res.redirect('/horarios');
});

// Handle form submissions for marking vacation
app.post('/horarios/vacaciones', (req, res) => {
  const { doctor_vacaciones, fecha_inicio_vacaciones, fecha_fin_vacaciones } = req.body;
  // Logic to mark vacation period in the database here
  console.log(`Marking vacation for ${doctor_vacaciones} from ${fecha_inicio_vacaciones} to ${fecha_fin_vacaciones}`);
  res.redirect('/horarios');
});


// Route for horarios page
app.get('/horarios', (req, res) => {
  res.render('horarios');
});

// Route for turnos page
app.get('/turnos', (req, res) => {
  res.render('turnos');
});

// Handle form submission for requesting an appointment
app.post('/turnos/solicitar', (req, res) => {
  const { nombre_paciente, dni, especialidad, obra_social } = req.body;

  // Simulated logic for checking availability
  const citasDisponibles = checkCitasDisponibles(especialidad);

  if (citasDisponibles) {
    // Logic to schedule an appointment in the database
    console.log(`Appointment scheduled for ${nombre_paciente} with ${especialidad}`);
    res.send(`Cita programada para ${nombre_paciente} en ${especialidad}`);
  } else {
    // Logic to add patient to waiting list
    console.log(`No available appointments. ${nombre_paciente} added to waiting list for ${especialidad}`);
    res.send(`${nombre_paciente} fue añadido a la lista de espera para ${especialidad}`);
  }
});

// Simulated function to check appointment availability
function checkCitasDisponibles(especialidad) {
  // In a real application, check the database for available slots
  return false; // Currently hardcoded to simulate no availability
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
