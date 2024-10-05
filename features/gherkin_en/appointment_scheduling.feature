Feature: Appointment Scheduling

Scenario: Schedule an appointment when slots are available
    Given the clinic has available time slots
    When a patient requests an appointment
    And selects an available time slot
    Then the appointment is successfully scheduled
    And the patient receives a confirmation email

Scenario: Add patient to waiting list when no slots are available
    Given a patient named "John Doe" with ID "12345678" requests an appointment
    When no slots are available for "Neurology"
    Then the patient is added to the waiting list for "Neurology"
    And the patient receives a notification about their status on the waiting list

Scenario: Secretary checks available and scheduled agendas
    Given the clinic has multiple doctors with different specialties
    When the secretary checks the agendas
    Then the secretary can see the available and scheduled appointments for each doctor
    And the secretary can filter the appointments by specialty and doctor

Scenario: Transfer patient between agendas
    Given a patient has an appointment scheduled with Dr. Smith
    When the patient requests to transfer the appointment to Dr. Johnson
    And there is an available slot with Dr. Johnson
    Then the appointment is transferred to Dr. Johnson's agenda
    And the patient is notified of the change