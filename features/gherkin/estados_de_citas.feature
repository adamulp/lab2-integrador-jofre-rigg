Feature: Estados de citas

Scenario: Confirmar una cita reservada
    Given un paciente tiene una cita reservada
    When el recepcionista confirma la cita
    Then el estado de la cita se actualiza a "confirmado"
    And el paciente es notificado de la confirmación

Scenario: Cancelar una cita
    Given un paciente tiene una cita confirmada
    When el paciente solicita cancelar la cita
    And el recepcionista cancela la cita
    Then el estado de la cita se actualiza a "cancelado"
    And el paciente es notificado de la cancelación

Scenario: Marcar a un paciente como ausente
    Given un paciente tiene una cita confirmada
    When el paciente no se presenta a la cita
    And el recepcionista marca al paciente como ausente
    Then el estado de la cita se actualiza a "ausente"
    And el paciente es notificado de la actualización del estado

Scenario: Actualizar el estado de la cita durante el proceso de consulta
    Given un paciente tiene una cita confirmada
    When el proceso de consulta comienza
    And el doctor actualiza el estado de la cita a "en consulta"
    Then el estado de la cita se actualiza a "en consulta"
    And el paciente es notificado de la actualización del estado