const { Paciente, Medico, Especialidad, Agenda, Turno } = require('../modelos'); // Ajusta la ruta según tu estructura de carpetas

exports.seed = async (sequelize) => {
  // Elimina los datos existentes
  await Turno.destroy({ where: {}, truncate: true });
  await Agenda.destroy({ where: {}, truncate: true });
  await Especialidad.destroy({ where: {}, truncate: true });
  await Medico.destroy({ where: {}, truncate: true });
  await Paciente.destroy({ where: {}, truncate: true });

  // Insertar Pacientes
  const pacientes = await Paciente.bulkCreate([
    {
      nombre_completo: 'Juan Pérez',
      dni: '12345678',
      contacto: 'juan.perez@example.com',
      obraSocial: 'OSDE'
    },
    {
      nombre_completo: 'Maria Gomez',
      dni: '87654321',
      contacto: 'maria.gomez@example.com',
      obraSocial: 'Swiss Medical'
    }
  ]);

  // Insertar Medicos
  const medicos = await Medico.bulkCreate([
    {
      nombre_completo: 'Dr. Carlos López',
      numeroMatricula: 'M12345'
    },
    {
      nombre_completo: 'Dra. Ana Fernández',
      numeroMatricula: 'M67890'
    }
  ]);

  // Insertar Especialidades
  const especialidades = await Especialidad.bulkCreate([
    { nombre: 'Cardiología' },
    { nombre: 'Neurología' }
  ]);

  // Insertar Agendas
  const agendas = await Agenda.bulkCreate([
    {
      clasificacion: 'Normal',
      estado: 'Disponible',
      medico_id: medicos[0].id  // Dr. Carlos López
    },
    {
      clasificacion: 'VIP',
      estado: 'Disponible',
      medico_id: medicos[1].id  // Dra. Ana Fernández
    }
  ]);

  // Insertar Turnos (Appointments)
  await Turno.bulkCreate([
    {
      fecha_hora: '2024-10-10 09:00:00',
      estado: 'Reservado',
      motivo_consulta: 'Chequeo general',
      paciente_id: pacientes[0].id,  // Juan Pérez
      medico_id: medicos[0].id,  // Dr. Carlos López
      especialidad_id: especialidades[0].id,  // Cardiología
      agenda_id: agendas[0].id  // Dr. López's agenda
    },
    {
      fecha_hora: '2024-10-11 11:00:00',
      estado: 'Reservado',
      motivo_consulta: 'Consulta neurológica',
      paciente_id: pacientes[1].id,  // Maria Gomez
      medico_id: medicos[1].id,  // Dra. Ana Fernández
      especialidad_id: especialidades[1].id,  // Neurología
      agenda_id: agendas[1].id  // Dra. Fernández's agenda
    }
  ]);
};
  