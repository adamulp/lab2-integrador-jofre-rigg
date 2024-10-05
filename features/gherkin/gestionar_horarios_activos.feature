Feature: Gestionar horarios y estados de las agendas de los médicos

  Scenario: Actualizar el horario de un médico
    Given el doctor "Dr. Pepe" tiene horarios disponibles "Lunes, Miércoles y Viernes de 8:00 a 16:00"
    And el doctor solicita cambiar los horarios de los viernes a "8:00 a 12:00" a partir del "2024-05-30"
    When el administrador actualiza el horario del doctor
    Then los nuevos horarios se reflejan en el sistema
    And los pacientes no pueden reservar citas después de las "12:00" los viernes desde el "2024-05-30"

  Scenario Outline: Marcar horarios no disponibles por vacaciones
    Given el doctor "<doctor>" tiene citas agendadas del "<fecha_inicio_agenda>" al "<fecha_fin_agenda>"
    When el administrador marca el periodo del "<fecha_inicio_vacaciones>" al "<fecha_fin_vacaciones>" como vacaciones
    Then todas las citas dentro de ese periodo se marcan como "No disponible"
    And el sistema actualiza la agenda para reflejar el periodo de vacaciones del médico

    Examples:
      | doctor    | fecha_inicio_agenda | fecha_fin_agenda | fecha_inicio_vacaciones | fecha_fin_vacaciones |
      | Dr. Pepe  | 2024-03-01          | 2024-03-15       | 2024-03-16              | 2024-03-30           |
      | Dr. López | 2024-04-01          | 2024-04-10       | 2024-04-11              | 2024-04-25           |
      | Dr. García| 2024-05-01          | 2024-05-15       | 2024-05-16              | 2024-05-30           |

  Scenario Outline: Actualizar el horario de un médico
    Given el doctor "<doctor>" tiene horarios disponibles "<dias_horarios>" 
    And el doctor solicita cambiar los horarios de los "<dia_cambio>" a "<nuevo_horario>" a partir del "<fecha_cambio>"
    When el administrador actualiza el horario del doctor
    Then los nuevos horarios se reflejan en el sistema
    And los pacientes no pueden reservar citas después de las "<nuevo_horario_fin>" los "<dia_cambio>" desde el "<fecha_cambio>"

    Examples:
      | doctor    | dias_horarios                     | dia_cambio | nuevo_horario    | nuevo_horario_fin | fecha_cambio |
      | Dr. Pepe  | Lunes, Miércoles y Viernes de 8:00 a 16:00 | Viernes    | 8:00 a 12:00     | 12:00            | 2024-05-30   |
      | Dr. López | Martes y Jueves de 9:00 a 17:00   | Jueves     | 9:00 a 13:00     | 13:00            | 2024-06-01   |
      | Dr. García| Lunes y Miércoles de 8:00 a 15:00 | Miércoles  | 8:00 a 12:00     | 12:00            | 2024-07-15   |
