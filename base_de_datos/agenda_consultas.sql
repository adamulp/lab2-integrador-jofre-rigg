-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `Agenda_Consultas`;

-- Use the correct database
USE `Agenda_Consultas`;

-- Table for doctors (MEDICOS)
CREATE TABLE IF NOT EXISTS medicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- UNSIGNED ensures compatibility with referencing column
    nombre_completo VARCHAR(255) NOT NULL,
    numero_matricula VARCHAR(50) NOT NULL UNIQUE
);

-- Table for patients (PACIENTES)
CREATE TABLE IF NOT EXISTS pacientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    informacion_contacto TEXT NOT NULL,
    obra_social VARCHAR(255)
);

-- Table for specialties (ESPECIALIDADES)
CREATE TABLE IF NOT EXISTS especialidades (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

-- Table for agendas (AGENDAS)
CREATE TABLE IF NOT EXISTS agendas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    clasificacion VARCHAR(50),
    estado VARCHAR(50),
    disponible_desde TIMESTAMP,
    disponible_hasta TIMESTAMP,
    medico_id INT UNSIGNED NOT NULL,  -- UNSIGNED matches the medicos.id type
    FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table for turnos (TURNOS)
CREATE TABLE IF NOT EXISTS turnos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    fecha_hora TIMESTAMP NOT NULL,
    estado VARCHAR(50) NOT NULL,
    motivo_consulta TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paciente_id INT UNSIGNED NOT NULL,
    medico_id INT UNSIGNED NOT NULL,
    especialidad_id INT UNSIGNED NOT NULL,
    agenda_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (agenda_id) REFERENCES agendas(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table for sobreturnos (SOBRETURNOS)
CREATE TABLE IF NOT EXISTS sobreturnos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    maximo_sobreturnos INT NOT NULL,
    agenda_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (agenda_id) REFERENCES agendas(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table for waiting list (LISTA_ESPERA)
CREATE TABLE IF NOT EXISTS lista_espera (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    agregado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paciente_id INT UNSIGNED NOT NULL,
    medico_id INT UNSIGNED NULL,
    especialidad_id INT UNSIGNED NULL,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(id) ON DELETE CASCADE ON UPDATE CASCADE
);
