Feature: Programar sobreturnos

  Scenario: Agendar un sobreturno en un horario reservado
    Given el doctor "Dr. García" tiene una cita reservada a las "2024-10-10 10:00 AM"
    And la agenda permite un máximo de "2" sobreturnos por día
    When la secretaria intenta agendar un sobreturno en el mismo horario
    Then el sobreturno se agenda exitosamente
    And la cita se marca como "Sobreturno"

  Scenario Outline: Intentar agendar un sobreturno con límite diario
    Given el doctor "<nombre_doctor>" tiene un máximo de "<sobreturnos_max>" sobreturnos permitidos por día
    And ya ha programado "<sobreturnos_actuales>" sobreturnos para el día "<fecha>"
    When la secretaria intenta agendar un sobreturno
    Then el sistema "<resultado>"

    Examples:
      | nombre_doctor | sobreturnos_max | sobreturnos_actuales | fecha       | resultado                               |
      | Dr. García    | 2               | 1                    | 2024-10-10  | acepta el sobreturno                    |
      | Dr. García    | 2               | 2                    | 2024-10-10  | rechaza la solicitud por sobreturnos    |
