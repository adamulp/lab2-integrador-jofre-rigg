Feature: Filtrar y transferir citas entre agendas

  Scenario: Filtrar citas por especialidad y médico
    Given la secretaria necesita ver la agenda para "Cardiología" con "Dr. García"
    When la secretaria filtra por "Cardiología" y "Dr. García"
    Then se muestran todas las citas disponibles para "Dr. García"

  Scenario: Transferir un paciente de la agenda de un médico a otro
    Given el paciente "Juan Pérez" tiene una cita con "Dr. García" el "2024-10-10"
    When la secretaria transfiere al paciente a "Dr. Rodríguez" debido a una emergencia
    Then la cita se actualiza para reflejar el cambio
    And la nueva cita del paciente con "Dr. Rodríguez" se confirma

  Scenario Outline: Transferir un paciente de una agenda a otra
    Given el paciente "<nombre_paciente>" tiene una cita con "<nombre_doctor_anterior>" el "<fecha_cita_anterior>"
    When la secretaria transfiere al paciente a "<nombre_doctor_nuevo>"
    Then la cita se actualiza para reflejar el cambio
    And la nueva cita del paciente con "<nombre_doctor_nuevo>" se confirma para el "<fecha_cita_nueva>" a las "<hora_cita_nueva>"

    Examples:
      | nombre_paciente | nombre_doctor_anterior | fecha_cita_anterior | nombre_doctor_nuevo | fecha_cita_nueva | hora_cita_nueva |
      | Juan Pérez      | Dr. García             | 2024-10-10          | Dr. Rodríguez       | 2024-10-15       | 11:00 AM        |
      | María González  | Dr. García             | 2024-10-12          | Dr. López           | 2024-10-20       | 2:30 PM         |
