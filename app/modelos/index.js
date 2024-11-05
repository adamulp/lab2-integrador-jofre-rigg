// modelos/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // Tu archivo de configuración de Sequelize

const DataTypes = Sequelize.DataTypes;

const Agenda = require('./Agenda')(sequelize, DataTypes); 
const Medico = require('./Medico')(sequelize, DataTypes); 
const Turno = require('./Turno')(sequelize, DataTypes); 
const Paciente = require('./Paciente')(sequelize, DataTypes);
const Especialidad = require('./Especialidad')(sequelize, DataTypes);

// Inicializa las relaciones
const models = {
    Agenda,
    Medico,
    Paciente,
    Especialidad,
    Turno,
};

// Asocia los modelos
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Exporta la instancia de Sequelize y los modelos
module.exports = {
    sequelize,
    ...models,
};