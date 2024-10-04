Feature: Registro de un paciente nuevo

  Scenario: Registrar un nuevo paciente en el consultorio
    Given un nuevo paciente "María González" con DNI "87654321" solicita una cita
    When la secretaria introduce toda la información personal y de obra social requerida
    And la información del paciente es validada
    Then se crea un nuevo registro de paciente en el sistema
    And el paciente es agendado para una cita con "Dr. García" el "2024-10-12" a las "15:00"

  Scenario Outline: Registrar un nuevo paciente en el consultorio
    Given un nuevo paciente "<nombre_paciente>" con DNI "<dni>" solicita una cita
    When la secretaria introduce toda la información personal y de obra social requerida
    And la información del paciente es validada
    Then se crea un nuevo registro de paciente en el sistema
    And el paciente es agendado para una cita con "<nombre_doctor>" el "<fecha_cita>" a las "<hora_cita>"

    Examples:
      | nombre_paciente  | dni       | nombre_doctor | fecha_cita  | hora_cita  |
      | Laura Gómez      | 98765432  | Dr. García    | 2024-10-15  | 9:00 AM    |
      | Carlos Ruiz      | 19283746  | Dr. Rodríguez | 2024-11-02  | 2:00 PM    |