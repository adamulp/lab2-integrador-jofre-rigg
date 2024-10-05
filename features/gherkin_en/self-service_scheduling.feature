Feature: Patient Self-Scheduling

    Scenario: Patient registers and schedules an appointment online
        Given a patient accesses the online scheduling system
        When the patient registers with all necessary personal information
        And uploads a photocopy of their National ID (DNI)
        And selects an available time slot for the desired specialty
        Then the appointment status is set to "reserved"
        And awaits confirmation from the reception

    Scenario: Reception confirms an online appointment
        Given a patient has reserved an appointment online
        And the receptionist has received the patient's ID photocopy
        When the receptionist validates the information
        And confirms the appointment
        Then the appointment status changes to "confirmed"