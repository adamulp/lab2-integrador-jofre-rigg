const express = require("express");
const router = express.Router();

const Especialidad = require('../modelos/Especialidad');
const Medico = require('../modelos/Medico');
const Paciente = require('../modelos/Paciente');

router.get('/', async (req, res) => {
    try {
      const pacientes = await Paciente.query(); // Fetch all Pacientes
      res.render('pacientes', { pacientes });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Route for pacientes page
  // router.get('/pacientes', (req, res) => {
  //  res.render('pacientes');
  // });

// Handle POST request for creating a new paciente
router.post('/create', async (req, res) => {
    try {
      const { nombreCompleto, dni, contacto, obraSocial } = req.body;
      await Paciente.query().insert({
        nombreCompleto,
        dni,
        contacto,
        obraSocial
      });
      res.redirect('/pacientes');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  // Handle POST request to delete a paciente
  router.post('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Paciente.query().deleteById(id);
      res.redirect('/pacientes');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  router.post('/buscar', async (req, res) => {
    try {
      const { nombreCompleto, dni } = req.query;
      const pacientes = await Paciente.query()
        .where('nombreCompleto', 'like', `%${nombreCompleto}%`)
        .orWhere('dni', 'like', `%${dni}%`);
      res.render('pacientes', { pacientes });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  // Handle POST request for searching pacientes
  router.post('/resultados', async (req, res) => {
    try {
      const { nombreCompleto, dni } = req.body;
    const pacientes = await Paciente.query()
      .where('nombreCompleto', 'like', `%${nombreCompleto}%`)
      .orWhere('dni', dni);
      res.render('resultadosPacientes', { pacientes });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


  router.get('/:id', async (req, res) => {
    try {
      const paciente = await Paciente.getPacienteById(req.params.id); // Fetch all Pacientes
    res.json(paciente);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

module.exports = router;