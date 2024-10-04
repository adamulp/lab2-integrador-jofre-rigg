```mermaid
erDiagram
    PACIENTE {
        int id PK
        string nombreCompleto
        string dni
        string informacionContacto
        string obraSocial
    }

    MEDICO {
        int id PK
        string nombreCompleto
        string numeroMatricula
    }

    ESPECIALIDAD {
        int id PK
        string nombre
    }

    CITA {
        int id PK
        datetime fechaHoraCita
        string estado
        string motivoConsulta
        datetime creadoEn
    }

    LISTA_ESPERA {
        int id PK
        datetime agregadoEn
    }

    AGENDA {
        int id PK
        string clasificacion
        string estado
        datetime disponibleDesde
        datetime disponibleHasta
    }

    SOBRETURNO {
        int id PK
        int maximoSobreturnos
    }

    CITA ||--|| PACIENTE : "pertenece a"
    CITA ||--|| MEDICO : "asignada a"
    CITA ||--|| ESPECIALIDAD : "relacionada con"
    CITA ||--o{ AGENDA : "en agenda"

    MEDICO ||--o{ ESPECIALIDAD : "tiene muchas"
    MEDICO ||--|{ AGENDA : "gestiona"
    MEDICO ||--|{ SOBRETURNO : "puede tener"

    PACIENTE ||--o{ LISTA_ESPERA : "puede estar en"
    LISTA_ESPERA ||--|| ESPECIALIDAD : "para"
    LISTA_ESPERA ||--|| MEDICO : "con"

    AGENDA ||--o{ SOBRETURNO : "puede tener"


```
