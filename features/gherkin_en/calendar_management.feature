Feature: Calendar Management of Non-Working Days

        Scenario: Load non-working days into the system
            Given the administrator has a list of non-working days for the year
            When the administrator inputs these dates into the system's calendar function
            Then the system marks these days as non-working
            And agendas cannot have appointments scheduled on these days

        Scenario: Attempt to schedule on a non-working day
            Given a day is marked as non-working in the system
            When a patient or secretary tries to schedule an appointment on that day
            Then the system prevents the scheduling
            And displays a message indicating the day is unavailable