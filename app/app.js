require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3000;

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

const app = express();
const router = express.Router();

const Paciente = require('./modelos/Paciente'); // Import the Paciente model
const Especialidad = require('./modelos/Especialidad'); 

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (compiled CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Log the environment mode
if (process.env.NODE_ENV === 'development' || process.env.HOSTNAME === 'localhost') {
    console.log('Running in development mode');
} else {
    console.log('Running in production mode');
}

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
app.get('/turnos', async (req, res) => {
    try {
      const especialidades = await Especialidad.query().select('nombre'); // Fetch all especialidades
      res.render('turnos', { especialidades });
    } catch (err) {
      res.status(500).send(err.message);
    }
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

// Route for sobreturnos page
app.get('/sobreturnos', (req, res) => {
  res.render('sobreturnos');
});

// Handle form submission for scheduling an overbooked appointment
app.post('/sobreturnos/solicitar', (req, res) => {
  const { doctor, fecha, hora } = req.body;

  // Simulated logic for checking overbooked appointment limits
  const maxSobreturnos = 2;
  const sobreturnosActuales = getCurrentSobreturnos(doctor, fecha); // Placeholder function

  if (sobreturnosActuales < maxSobreturnos) {
    // Logic to schedule an overbooked appointment in the database
    console.log(`Sobreturno scheduled for ${doctor} on ${fecha} at ${hora}`);
    res.send(`Sobreturno agendado para ${doctor} el ${fecha} a las ${hora}`);
  } else {
    // Limit reached, cannot schedule more overbooked appointments
    console.log(`Maximum overbooked appointments reached for ${doctor} on ${fecha}`);
    res.send(`No se pudo agendar el sobreturno para ${doctor} el ${fecha} a las ${hora}: Límite de sobreturnos alcanzado`);
  }
});

// Placeholder function to get the current number of overbooked appointments for a doctor on a given date
function getCurrentSobreturnos(doctor, fecha) {
  // In a real application, query the database to get the current number of sobreturnos for the doctor
  return 1; // Hardcoded value for simulation purposes
}

// Route for actualizarTurnos page
app.get('/actualizarTurnos', (req, res) => {
  res.render('actualizarTurnos');
});

// Handle form submission for managing appointment status
app.post('/actualizarTurnos/gestionar', (req, res) => {
  const { nombre_paciente, fecha_cita, hora_cita, nuevo_estado } = req.body;

  // Simulated logic for updating appointment status in the database
  const cita = findCita(nombre_paciente, fecha_cita, hora_cita); // Placeholder function to find appointment

  if (cita) {
    // Update the status of the appointment
    cita.estado = nuevo_estado;
    console.log(`Appointment updated for ${nombre_paciente} on ${fecha_cita} at ${hora_cita} to status: ${nuevo_estado}`);

    // Response to indicate success
    res.send(`La cita para ${nombre_paciente} el ${fecha_cita} a las ${hora_cita} ha sido actualizada a "${nuevo_estado}".`);
  } else {
    // Handle case where the appointment could not be found
    res.send(`No se encontró la cita para ${nombre_paciente} el ${fecha_cita} a las ${hora_cita}.`);
  }
});

// Placeholder function to find an appointment
function findCita(nombre_paciente, fecha_cita, hora_cita) {
  // In a real application, query the database to find the appointment
  return { estado: 'Reservada' }; // Hardcoded value for simulation purposes
}

// Route for agendas page
app.get('/agendas', (req, res) => {
  res.render('agendas');
});

// Handle form submission for filtering appointments
app.post('/agendas/filtrar', (req, res) => {
  const { especialidad, medico } = req.body;

  // Simulated logic for filtering appointments
  const citas = filtrarCitas(especialidad, medico); // Placeholder function

  console.log(`Filtered appointments for ${especialidad} with ${medico}`);
  res.send(`Citas filtradas para ${especialidad} con ${medico}: ${JSON.stringify(citas)}`);
});

// Handle form submission for transferring an appointment
app.post('/agendas/transferir', (req, res) => {
  const { nombre_paciente, doctor_anterior, fecha_cita_anterior, doctor_nuevo, fecha_cita_nueva, hora_cita_nueva } = req.body;

  // Simulated logic for transferring an appointment
  const citaTransferida = transferirCita(nombre_paciente, doctor_anterior, fecha_cita_anterior, doctor_nuevo, fecha_cita_nueva, hora_cita_nueva); // Placeholder function

  if (citaTransferida) {
    console.log(`Appointment transferred for ${nombre_paciente} from ${doctor_anterior} to ${doctor_nuevo}`);
    res.send(`La cita para ${nombre_paciente} se ha transferido de ${doctor_anterior} a ${doctor_nuevo} para el ${fecha_cita_nueva} a las ${hora_cita_nueva}.`);
  } else {
    res.send(`No se pudo transferir la cita para ${nombre_paciente}.`);
  }
});

// Placeholder functions to simulate database interactions
function filtrarCitas(especialidad, medico) {
  // In a real application, query the database for filtered appointments
  return [
    { paciente: 'Juan Pérez', fecha: '2024-10-10', hora: '10:00 AM', medico },
    { paciente: 'María González', fecha: '2024-10-12', hora: '2:00 PM', medico }
  ];
}

function transferirCita(nombre_paciente, doctor_anterior, fecha_cita_anterior, doctor_nuevo, fecha_cita_nueva, hora_cita_nueva) {
  // In a real application, update the appointment details in the database
  return true; // Hardcoded to simulate successful transfer
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});