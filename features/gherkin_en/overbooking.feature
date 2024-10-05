Feature: Overbooking

    Scenario: Create an overbooked time slot when maximum is not exceeded
        Given a regular appointment slot is already reserved
        And the maximum number of overbooked slots per day is not exceeded for the agenda
        When the secretary generates a special overbooked time slot at the same schedule
        Then the overbooked time slot is added to the agenda

    Scenario: Prevent overbooking when maximum is reached
        Given the maximum number of overbooked slots per day has been reached for the agenda
        When the secretary attempts to create another overbooked time slot
        Then the system prevents the creation
        And displays a message indicating the maximum has been reached
