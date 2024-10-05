Feature: Gestión del calendario de la clínica

Scenario: Cargar días no laborables en el sistema
    Given la clínica tiene una lista de días no laborables
    When el administrador carga estos días no laborables en el sistema
    Then el sistema no debe permitir programar citas en estos días
    And los días no laborables son visibles en el calendario de la clínica

Scenario: Intentar programar en un día no laborable
    Given la clínica tiene una lista de días no laborables
    And un paciente intenta programar una cita en uno de estos días
    When el paciente selecciona un día no laborable
    Then el sistema no debe permitir programar la cita
    And el paciente es informado de que el día seleccionado no está disponible

Scenario: Prevenir sobreturnos cuando se alcanza el máximo
    Given la clínica tiene un máximo de 10 citas por día
    And ya hay 10 citas programadas para un día específico
    When un paciente intenta reservar una cita para ese día
    Then la cita no se programa
    And el paciente es informado de que no hay horarios disponibles

Scenario: Crear un horario sobreturno cuando no se excede el máximo
    Given la clínica tiene un máximo de 10 citas por día
    And ya hay 9 citas programadas para un día específico
    When un paciente intenta reservar una cita para ese día
    Then la cita se programa con éxito
    And el número total de citas para ese día es 10