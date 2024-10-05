Feature: Gestión de los estados de las citas

  Scenario: Confirmar una cita reservada
    Given una cita está reservada para el paciente "Juan Pérez" el "2024-10-10" a las "10:00 AM"
    When el paciente llega al consultorio y el personal de admisión confirma la cita
    Then el estado de la cita se actualiza a "Confirmado"

  Scenario: Cancelar una cita
    Given una cita está confirmada para el paciente "María González" el "2024-10-12" a las "15:00"
    When el paciente cancela la cita con 24 horas de antelación
    Then el estado de la cita se actualiza a "Cancelado"
    And el horario queda disponible para otros pacientes

  Scenario: Marcar a un paciente como ausente
    Given una cita está confirmada para el paciente "Juan Pérez" el "2024-10-10" a las "10:00 AM"
    When el paciente no se presenta a la cita
    Then el estado de la cita se actualiza a "Ausente"
    And la secretaria es notificada para hacer un seguimiento con el paciente

  Scenario Outline: Cambios en el estado de una cita
    Given una cita está programada para el paciente "<nombre_paciente>" el "<fecha_cita>" a las "<hora_cita>"
    When ocurre el evento "<evento>"
    Then el estado de la cita se actualiza a "<nuevo_estado>"

    Examples:
      | nombre_paciente | fecha_cita  | hora_cita  | evento                | nuevo_estado  |
      | Juan Pérez      | 2024-10-10  | 10:00 AM   | El paciente llega     | Confirmado    |
      | María González  | 2024-10-12  | 03:00 PM   | El paciente no asiste | Ausente       |
      | Laura Gómez     | 2024-10-15  | 9:00 AM    | El paciente cancela   | Cancelado     |

