Feature: Agenda Status Management

    Scenario: Confirm a reserved appointment
        Given an appointment is in "reserved" status
        When the receptionist confirms the appointment
        Then the appointment status changes to "confirmed"

    Scenario: Cancel an appointment
        Given a patient wishes to cancel an appointment at least 24 hours in advance
        When the secretary updates the appointment status
        Then the appointment status changes to "canceled"
        And the time slot becomes available for other patients

    Scenario: Mark a patient as a no-show
        Given the appointment time has passed
        And the patient did not attend the appointment
        When the receptionist marks the appointment accordingly
        Then the appointment status changes to "no-show"

    Scenario: Update appointment status during consultation process
        Given a patient arrives for a confirmed appointment
        When the patient is marked as present
        And later marked as "in consultation" when seeing the provider
        And finally marked as "attended" after the consultation
        Then the appointment status reflects each stage accordingly
