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
      nombreCompleto: 'Juan Pérez',
      dni: '12345678',
      contacto: 'juan.perez@example.com',
      obraSocial: 'OSDE'
    },
    {
      nombreCompleto: 'Maria Gomez',
      dni: '87654321',
      contacto: 'maria.gomez@example.com',
      obraSocial: 'Swiss Medical'
    }
  ]);

  // Insertar Medicos
  const medicos = await Medico.bulkCreate([
    {
      nombreCompleto: 'Dr. Carlos López',
      numeroMatricula: 'M12345'
    },
    {
      nombreCompleto: 'Dra. Ana Fernández',
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
      medicoId: medicos[0].id  // Dr. Carlos López
    },
    {
      clasificacion: 'VIP',
      estado: 'Disponible',
      medicoId: medicos[1].id  // Dra. Ana Fernández
    }
  ]);

  // Insertar Turnos (Appointments)
  await Turno.bulkCreate([
    {
      fechaHora: '2024-10-10 09:00:00',
      estado: 'Reservado',
      motivoConsulta: 'Chequeo general',
      pacienteId: pacientes[0].id,  // Juan Pérez
      medicoId: medicos[0].id,  // Dr. Carlos López
      especialidadId: especialidades[0].id,  // Cardiología
      agendaId: agendas[0].id  // Dr. López's agenda
    },
    {
      fechaHora: '2024-10-11 11:00:00',
      estado: 'Reservado',
      motivoConsulta: 'Consulta neurológica',
      pacienteId: pacientes[1].id,  // Maria Gomez
      medicoId: medicos[1].id,  // Dra. Ana Fernández
      especialidadId: especialidades[1].id,  // Neurología
      agendaId: agendas[1].id  // Dra. Fernández's agenda
    }
  ]);
};
  