Feature: Patient Registration

    Scenario: Register a new patient
        Given a patient is new to the system
        When the secretary collects all personal information
        And enters it into the system
        Then a new patient record is created

    Scenario: Update existing patient information
        Given a patient already exists in the system
        When the secretary retrieves the patient's information
        And verifies or updates the details as necessary
        Then the patient record is updated with the new information