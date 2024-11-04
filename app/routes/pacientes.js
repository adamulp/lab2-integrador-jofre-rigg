const express = require("express");
const router = express.Router();
const { Op } = require('sequelize');

const Especialidad = require('../modelos/Especialidad');
const Medico = require('../modelos/Medico');
const Paciente = require('../modelos/Paciente');
const PacienteController = require('../controllers/pacienteController');

// Obtener todos los pacientes
router.get('/', PacienteController.obtenerPacientes);

// Manejar la creación de un nuevo paciente
router.post('/create', async (req, res) => {
  try {
      const { nombre_completo, dni, contacto, obraSocial } = req.body;
      await Paciente.create({
          nombre_completo,
          dni,
          contacto,
          obraSocial
      });
      res.redirect('/pacientes');
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// Manejar la eliminación de un paciente
router.post('/delete/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await Paciente.destroy({ where: { id: id } }); // Eliminar paciente por ID
      res.redirect('/pacientes');
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// Manejar la búsqueda de pacientes
router.post('/buscar', async (req, res) => {
  try {
      const { nombre_completo, dni } = req.body; // Cambiado a req.body para consistentemente manejar formularios
      const pacientes = await Paciente.findAll({
          where: {
              [Op.or]: [
                  { nombre_completo: { [Op.like]: `%${nombre_completo}%` } },
                  { dni: { [Op.like]: `%${dni}%` } }
              ]
          }
      });
      res.render('pacientes', { pacientes });
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// Manejar la búsqueda de resultados
router.post('/resultados', async (req, res) => {
  try {
      const { nombre_completo, dni } = req.body;
      const pacientes = await Paciente.findAll({
          where: {
              [Op.or]: [
                  { nombre_completo: { [Op.like]: `%${nombre_completo}%` } },
                  { dni: dni }
              ]
          }
      });
      res.render('resultadosPacientes', { pacientes });
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// Obtener un paciente por ID
router.get('/:id', async (req, res) => {
  try {
      const paciente = await Paciente.findByPk(req.params.id); // Fetch paciente by ID
      if (!paciente) {
          return res.status(404).send('Paciente no encontrado');
      }
      res.json(paciente);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

module.exports = router;