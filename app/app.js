require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3000;

const { sequelize, Agenda, Medico, Paciente, Especialidad, Turno } = require('./modelos');

const bodyParser = require('body-parser');
const path = require('path');

// Configuración de Sequelize

// Prueba la conexión con la base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión establecida con la base de datos.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

const app = express();
const router = express.Router();



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
const pacientesRouter = require("./routes/pacientes");
app.use("/pacientes", pacientesRouter);

// Route for horarios page
app.get('/horarios', async (req, res) => {
    try {
      const medicos = await Medico.findAll({ attributes: ['nombre_completo'] }); // Fetch all medicos
      res.render('horarios', { medicos });
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

// Placeholder functions to simulate database interactions
function filtrarCitas(especialidad, medico, paciente) {
    // In a real application, query the database for filtered appointments
    return [
      { title: 'Cita 1', start: '2023-10-01' },
      { title: 'Cita 2', start: '2023-10-07', end: '2023-10-10' },
      { title: 'Cita 3', start: '2023-10-09T16:00:00' }
    ];
  }
  
// Route for calendario page
app.get('/calendario', async (req, res) => {
    try {
      const especialidades = await Especialidad.findAll();
      const medicos = await Medico.findAll();
      const pacientes = await Paciente.findAll();
      res.render('calendario', { citas: [], especialidades, medicos, pacientes });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  app.post('/calendario', async (req, res) => {
    const { especialidad, medico, paciente } = req.body;
    const citas = filtrarCitas(especialidad, medico, paciente);
    try {
      const especialidades = await Especialidad.findAll();
      const medicos = await Medico.findAll();
      const pacientes = await Paciente.findAll();
      res.render('calendario', { citas, especialidades, medicos, pacientes });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

app.get('/calMes', (req, res) => {
res.render('calMes');
});

app.get('/calSemana', (req, res) => {
    res.render('calSemana');
});

// Route for turnos page
app.get('/turnos', async (req, res) => {
    try {
      const especialidades = await Especialidad.findAll({ attributes: ['nombre'] }); // Fetch all especialidades
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
app.get('/sobreturnos', async (req, res) => {
    try {
        const medicos = await Medico.findAll({ attributes: ['nombre_completo'] }); // Fetch all medicos
        res.render('sobreturnos', { medicos });
    } catch (err) {
        res.status(500).send(err.message);
    }
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
const agendaRouter = require("./routes/agenda");
app.use("/agendas", agendaRouter);

// Placeholder functions to simulate database interactions
function filtrarCitas(especialidad, medico) {
  // In a real application, query the database for filtered appointments
  return [
    { paciente: 'Juan Pérez', fecha: '2024-10-10', hora: '10:00 AM', medico },
    { paciente: 'María González', fecha: '2024-10-12', hora: '2:00 PM', medico }
  ];
}



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});