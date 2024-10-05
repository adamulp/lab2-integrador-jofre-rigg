Feature: Auto gestión de turnos para los pacientes

Scenario: El paciente se registra y programa una cita en línea
    Given un paciente accede al sistema de programación en línea
    When el paciente se registra con toda la información personal necesaria
    And sube una fotocopia de su DNI
    And selecciona un horario disponible para la especialidad deseada
    Then el estado de la cita se establece en "reservado"
    And espera la confirmación de la recepción

Scenario: La recepción confirma una cita en línea
    Given que un paciente ha programado una cita en línea
    And el estado de la cita es "reservado"
    Cuando el recepcionista revisa los detalles de la cita
    And confirma la cita
    Then el estado de la cita se actualiza a "confirmado"
    And el paciente es notificado por correo electrónico

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