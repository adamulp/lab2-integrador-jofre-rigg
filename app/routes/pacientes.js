const express = require("express");
const router = express.Router();
const { Op } = require('sequelize');

const Especialidad = require('../models/Especialidad');
const Medico = require('../models/Medico');
const Paciente = require('../models/Paciente');
const PacienteController = require('../controllers/pacienteController');

// Obtener todos los pacientes
router.get('/', PacienteController.obtenerPacientes);

router.post('/create', PacienteController.crearPaciente);

router.post('/buscar', PacienteController.buscarPaciente);

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


// Manejar la búsqueda de resultados
router.post('/resultados', async (req, res) => {
  try {
      const { nombreCompleto, dni } = req.body;
      const pacientes = await Paciente.findAll({
          where: {
              [Op.or]: [
                  { nombreCompleto: { [Op.like]: `%${nombreCompleto}%` } },
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

/*router.post('/buscar', async (req, res) => {
  try {
    const { nombreCompleto, dni } = req.body;
    let whereClause = {};

    if (nombreCompleto && dni) {
      // Use AND logic when both fields are filled
      whereClause = {
        nombreCompleto: { [Op.like]: `%${nombreCompleto}%` },
        dni: { [Op.like]: `%${dni}%` }
      };
    } else if (nombreCompleto || dni) {
      // Use OR logic when only one field is filled
      whereClause = {
        [Op.or]: [
          nombreCompleto ? { nombreCompleto: { [Op.like]: `%${nombreCompleto}%` } } : null,
          dni ? { dni: { [Op.like]: `%${dni}%` } } : null
        ].filter(Boolean) // Remove null values
      };
    }

    const pacientes = await Paciente.findAll({ where: whereClause });
    res.render('pacientes', { pacientes });
  } catch (err) {
    res.status(500).send(err.message);
  }
});*/

module.exports = router;