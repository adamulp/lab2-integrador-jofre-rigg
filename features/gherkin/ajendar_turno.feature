Feature: Programar una consulta médica para un paciente

  Scenario: Paciente agenda una cita con un cardiólogo
    Given el paciente "Juan Pérez" con DNI "12345678" solicita una cita
    And el paciente provee su información personal y detalles de su obra social
    When la secretaria busca citas disponibles para "Cardiología"
    And se encuentra una cita disponible con "Dr. García" para el "2024-10-10" a las "10:00 AM"
    Then la cita queda reservada
    And el estado de la cita es "Reservada"

  Scenario: No hay citas disponibles, paciente añadido a la lista de espera
    Given el paciente "María González" con DNI "87654321" solicita una cita
    When no hay citas disponibles para "Neurología"
    Then el paciente es añadido a la lista de espera de "Neurología"
    And el paciente recibe una notificación sobre su estado en la lista de espera
    
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
