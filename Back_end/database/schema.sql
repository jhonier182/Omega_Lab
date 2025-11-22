-- Base de datos para sistema PLM/LIMS
-- Proscience Lab

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS proscience CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE proscience;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    rol ENUM('usuario', 'analista', 'supervisor', 'qa_manager', 'admin') DEFAULT 'usuario',
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- NOTA: Los usuarios deben crearse a través de la API (/api/auth/register)
-- El password se hashea automáticamente con bcrypt
-- 
-- Para crear un usuario admin inicial, ejecuta:
-- POST /api/auth/register con:
-- {
--   "email": "admin@proscience.com",
--   "password": "admin123",
--   "nombre": "Administrador",
--   "rol": "admin"
-- }

