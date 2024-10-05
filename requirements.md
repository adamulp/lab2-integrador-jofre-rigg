# Medical Consultation Scheduling Application

The "medical consultation scheduling" application consists of a system for scheduling medical appointments.

The scheduling system supports booking patients who need to make a medical consultation appointment for a specific specialty (e.g., Cardiology, Neurology, Pulmonology, etc.).

The application centralizes all scheduling throughout the network of healthcare providers in the organization into one system.

## Main Features

- Provide the most flexible scheduling process by displaying all professionals on a single screen.
- Easy tools for copying and transferring schedules.
- Practical timetable solutions both when scheduling an appointment and during the appointment itself.

Agendas will be organized by office locations and will have two types of classifications:

- A customizable classification type defined by the organization (e.g., it could be used to differentiate the types of consultations: Normal, Special, VIP, etc.).
- By specialty, this classification will be determined by the specialty of the doctor on the agenda.

### Appointment Scheduling

The scheduling of an appointment for an agenda is done when a patient arrives at a clinic or a doctor's office in network and asks to be seen by a specific doctor (note that this step could also be done through other remote methods, such as phone, WhatsApp, email, etc.). When this happens, the secretary asks for the following information: Full name, National ID (DNI), reason for consultation (optional), health insurance, and contact information so that the appointment can be arranged during the dates and times which are available.

The system must facilitate searching for open slots on a selected schedule as well as searching by appointment information.

When confirming a selected slot from the list of open times, the appointment status will change to "reserved."

In cases where no appointments are available in the short term, the secretary can place the patient on a waiting list for the healthcare professional or specialist, so that if appointments become available, they can be considered.

At any time, the application must allow the secretary to check available and/or scheduled agendas/slots. To meet this need, agendas must be filterable by different criteria. Filters may include classification, medical specialty, doctor, appointment status, day, and combinations of these.

The application must allow transferring/copying patients between agendas, updating all the necessary information so that the appointments reflect this action.

### Overbooking (Sobreturnos)

The application must allow generating special time slots (known as "overbooking"). These special time slots can share the same schedule as a regular appointment in the agenda, provided that the regular appointment is already reserved. Each agenda may have a maximum number of overbooked slots per day (which can differ for each agenda).

### Providers

Providers must be registered by administrative users. A healthcare professional can have more than one specialty, with each specialty requiring a registered license or certification. A provider can have an agenda for each specialty.

### Agenda Statuses

Agendas must have planned time slots (which correspond to the appointments). Because each agenda can have a different schedule plan, there must be a function for configuring agendas that allows for planning tentative open slots.

For example, an agenda could have 30-minute slots with available hours on Mondays, Wednesdays, and Fridays from 8:00 AM to 12:00 PM.

Another agenda might have 40-minute slots with available hours on Thursdays from 4:00 PM to 9:00 PM, and Fridays from 9:00 AM to 3:00 PM.

It’s important to consider that there could be available appointments in the morning and in the afternoon, with unavailable time slots in between.

The schedules will repeat weekly until the provider decides to change them.

It’s important for the agenda to be able to block time slots due to unforeseen events or planned absences (e.g., the professional’s vacation).

Time slots on the agendas may have the following statuses:

- Not available (cannot be reserved)
- Free (available for reservation)
- Reserved (reserved by the patient, awaiting confirmation from the reception or admissions area)
- Confirmed (appointment confirmed by receptionist)
- Canceled (patient cancels the appointment up to 24 hours in advance)
- No-show (patient did not attend the appointment)
- Present (patient attended the appointment)
- In consultation (patient is currently being seen by the healthcare professional)
- Attended (patient has been seen by the professional)

### Patient Registration

When a patient is new, the system must request all personal information and generate a patient record.

If the patient is not new, the system must present the person’s information so it can be verified and updated if necessary.

### Patient Self-Scheduling

Patients can register for an account with the system and make their appointments online. The reservation must be confirmed by reception for the appointment to be finalized. During the registeration, a patient must provide all the necessary information, just as if it were done in person. Additionally, they must upload a photocopy of their ID so that it can be validated in the reception area.

### Calendar

The system must provide a function allowing administrators to load non-working days for the year so that these days cannot be scheduled or reserved in the agendas.

### Example Time Slots Supported by the Application

Dr. Pepe has the following available time slots for appointments:

    From January 1st to February 20th:
        * Mondays, Wednesdays, and Fridays from 8:00 AM to 4:00 PM;
        * Thursdays from 9:00 AM to 12:00 PM and from 4:00 PM to 8:30 PM.

    Dr. Pepe is on vacation from February 21st for two weeks.

    From March 15th to May 29th:
        * Mondays, Wednesdays, and Fridays from 8:00 AM to 4:00 PM;
        * Thursdays from 9:00 AM to 12:00 PM and from 4:00 PM to 8:30 PM.

    From May 30th to June 20th:
        * Mondays, Wednesdays, and Fridays from 8:00 AM to 4:00 PM;
        * Fridays from 8:00 AM to 12:00 PM.

    After June 21st, there are no planned schedules yet.

Any time slot that does not follow the defined rules should be marked as "not available" in the doctor’s agenda. Additionally, the agendas should display the time slots marked as "vacation."
