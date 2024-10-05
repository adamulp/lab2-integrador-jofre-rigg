Feature: Registro de pacientes

Scenario: Registrar un nuevo paciente
    Given un nuevo paciente visita la clínica
    When el recepcionista registra al paciente con toda la información personal necesaria
    And asigna un ID único al paciente
    Then el paciente se registra con éxito en el sistema
    And el paciente recibe un correo electrónico de bienvenida

Scenario: Actualizar la información de un paciente existente
    Given un paciente existente visita la clínica
    When el recepcionista actualiza la información personal del paciente
    And guarda los cambios en el sistema
    Then la información del paciente se actualiza con éxito
    And el paciente recibe un correo electrónico de confirmación

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
