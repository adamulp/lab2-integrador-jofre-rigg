Feature: Programación de turnos

Scenario: Programar una cita cuando hay horarios disponibles
    Given la clínica tiene horarios disponibles
    When un paciente solicita una cita
    And selecciona un horario disponible
    Then la cita se programa con éxito
    And el paciente recibe un correo electrónico de confirmación

  Scenario: No hay citas disponibles, paciente añadido a la lista de espera
    Given el paciente "María González" con DNI "87654321" solicita una cita
    When no hay citas disponibles para "Neurología"
    Then el paciente es añadido a la lista de espera de "Neurología"
    And el paciente recibe una notificación sobre su estado en la lista de espera

Scenario: La secretaria revisa las agendas disponibles y programadas
    Given la clínica tiene múltiples doctores con diferentes especialidades
    When la secretaria revisa las agendas
    Then la secretaria puede ver las citas disponibles y programadas para cada doctor
    And la secretaria puede filtrar las citas por especialidad y doctor

Scenario: Transferir paciente entre agendas
    Given un paciente tiene una cita programada con el Dr. Pérez
    When el paciente solicita transferir la cita al Dr. García
    And hay un horario disponible con el Dr. García
    Then la cita se transfiere a la agenda del Dr. García
    And el paciente es notificado del cambio
    
  Scenario Outline: Paciente agenda una cita con un especialista
    Given el paciente "<nombre_paciente>" con DNI "<dni>" solicita una cita
    And el paciente provee su información personal y detalles de su obra social
    When la secretaria busca citas disponibles para "<especialidad>"
    And se encuentra una cita disponible con "<nombre_doctor>" para el "<fecha_cita>" a las "<hora_cita>"
    Then la cita queda reservada
    And el estado de la cita es "Reservada"

    Examples:
      | nombre_paciente | dni       | especialidad | nombre_doctor | fecha_cita | hora_cita |
      | Juan Pérez      | 12345678  | Cardiología  | Dr. García    | 2024-10-10 | 10:00 AM  |
      | María González  | 87654321  | Neurología   | Dr. Rodríguez | 2024-10-12 | 03:00 PM  |
