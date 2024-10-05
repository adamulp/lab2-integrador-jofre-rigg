Feature: Appointment Statuses

Scenario: Confirm a reserved appointment
    Given a patient has a reserved appointment
    When the receptionist confirms the appointment
    Then the appointment status is updated to "confirmed"
    And the patient is notified of the confirmation

Scenario: Cancel an appointment
    Given a patient has a confirmed appointment
    When the patient requests to cancel the appointment
    And the receptionist cancels the appointment
    Then the appointment status is updated to "canceled"
    And the patient is notified of the cancellation

Scenario: Mark a patient as a no-show
    Given a patient has a confirmed appointment
    When the patient does not show up for the appointment
    And the receptionist marks the patient as a no-show
    Then the appointment status is updated to "no-show"
    And the patient is notified of the status update

Scenario: Update appointment status during consultation process
    Given a patient has a confirmed appointment
    When the consultation process begins
    And the doctor updates the appointment status to "in consultation"
    Then the appointment status is updated to "in consultation"
    And the patient is notified of the status update