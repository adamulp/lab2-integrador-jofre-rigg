Feature: Appointment Scheduling

    Scenario: Schedule an appointment when slots are available
        Given a patient arrives at the clinic or contacts via phone, WhatsApp, or email
        And the patient provides full name, National ID (DNI), health insurance, and contact information
        And there is an available time slot for the requested specialty
        When the secretary searches for open slots on the selected schedule
        And reserves the selected time slot
        Then the appointment status changes to "reserved"

    Scenario: Add patient to waiting list when no slots are available
        Given a patient requests an appointment for a specific doctor or specialist
        And there are no available appointments in the short term
        When the secretary adds the patient to the waiting list for that professional
        Then the patient is placed on the waiting list
        And will be considered if an appointment becomes available

    Scenario: Secretary checks available and scheduled agendas
        Given the secretary needs to check agendas and time slots
        When the secretary filters agendas by classification, specialty, doctor, appointment status, or day
        Then the system displays the filtered agendas and available or scheduled time slots

    Scenario: Transfer patient between agendas
        Given a patient has a reserved appointment in one agenda
        When the secretary transfers or copies the patient to another agenda
        Then the appointment information is updated to reflect the transfer
        And the original time slot becomes available if transferred
