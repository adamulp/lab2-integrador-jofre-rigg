Feature: Provider Registration and Agendas

Scenario: Register a new provider with multiple specialties
    Given the administrative user is on the provider registration page
    When the user enters the provider's personal information
    And assigns multiple specialties to the provider, each with a registered license or certification
    Then the provider is successfully registered in the system

Scenario: Configure an agenda with planned time slots
    Given a provider has specified their available days and times
    When the administrative user configures the agenda with planned time slots according to the provider's schedule
    Then the agenda displays the planned open slots
    And repeats weekly until changed by the provider

Scenario: Block time slots due to vacation
    Given a provider has planned absences or unforeseen events
    When the administrative user blocks specific time slots in the agenda
    Then those time slots are marked as "not available" or "vacation"
    And cannot be reserved by patients

Scenario: Configure Dr. Pepe's time slots from January 1st to February 20th
    Given Dr. Pepe's availability from January 1st to February 20th is:
        - Mondays, Wednesdays, and Fridays from 8:00 AM to 4:00 PM
        - Thursdays from 9:00 AM to 12:00 PM and from 4:00 PM to 8:30 PM
    When the administrative user sets up Dr. Pepe's agenda accordingly
    Then the agenda displays the correct time slots for those dates

Scenario: Mark Dr. Pepe's vacation from February 21st for two weeks
    Given Dr. Pepe will be on vacation starting February 21st for two weeks
    When the administrative user blocks off those dates in the agenda
    Then the time slots during that period are marked as "vacation" and "not available"

Scenario: Update Dr. Pepe's schedule from May 30th to June 20th
    Given Dr. Pepe's availability changes from May 30th to June 20th to:
        - Mondays, Wednesdays, and Fridays from 8:00 AM to 4:00 PM
        - Fridays from 8:00 AM to 12:00 PM
    When the administrative user updates the agenda
    Then the new time slots are reflected in the system

Scenario: No planned schedules after June 21st
    Given there are no planned schedules for Dr. Pepe after June 21st
    When patients or secretaries check the agenda beyond this date
    Then the system shows no available time slots
    And indicates that the schedule is not yet planned