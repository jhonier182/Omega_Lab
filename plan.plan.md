# Plan para Crear Documento de Contexto de la Aplicación PLM/LIMS

## Objetivo

Crear un documento de contexto (`CONTEXTO_APLICACION.md`) que proporcione una visión clara y completa de la aplicación PLM/LIMS para Proscience Lab, extrayendo y sintetizando la información clave de los 3 documentos de análisis.

## Estructura del Documento

### 1. Introducción y Visión General

- Qué es la aplicación (definición PLM/LIMS)
- Para qué empresa está diseñada (Proscience Lab)
- Objetivo principal del sistema
- Contexto de la industria (nutracéuticos y suplementos dietarios en Colombia)

### 2. Propósito y Necesidad

- Problema que resuelve
- Situación actual vs situación esperada
- Justificación del proyecto
- Beneficios esperados (cuantitativos y cualitativos)

### 3. Características Principales

- Asistencia de IA en formulación (diferencial clave)
- Gestión del ciclo de vida del producto (PLM)
- Sistema de información de laboratorio (LIMS)
- Trazabilidad completa
- Integridad de datos (ALCOA+)
- Cumplimiento regulatorio

### 4. Módulos del Sistema (10 módulos principales)

- Dashboard
- Ideas/Research
- Formulación
- IA/Simulación
- Producción
- Pruebas/Control de Calidad (LIMS)
- Aprobación/QA
- Trazabilidad
- Base de Conocimiento
- Configuración

### 5. Usuarios y Roles

- 5 tipos de usuarios con sus permisos
- Módulos accesibles por rol
- Restricciones por rol

### 6. Arquitectura Tecnológica

- **Frontend**: React 18 con Vite, Tailwind CSS, React Router
- **Backend**: Java Spring Boot 4.0+ con Spring Data JPA
- **ORM**: Hibernate (a través de Spring Data JPA)
- **Base de Datos**: MySQL 8.0+ con UTF8MB4
- **Seguridad**: JWT (JSON Web Tokens), Spring Security, RBAC
- **Autenticación**: Spring Security con JWT
- **Validación**: Bean Validation (JSR-303)
- **API**: RESTful con Spring Web MVC
- **PWA**: Progressive Web App (frontend)
- **Build Tool**: Maven
- **Java Version**: Java 21

### 7. Cumplimiento Regulatorio

- Normativas colombianas (Decreto 3249 de 2006, Ley 1581 de 2012)
- Principios ALCOA+
- Validación según BPM
- Auditorías INVIMA

### 8. Alcance del Proyecto

- Qué incluye
- Qué no incluye (fases futuras)

### 9. Métricas de Éxito Esperadas

- Reducción de tiempos
- Eliminación de errores
- Mejoras en eficiencia

## Fuentes de Información

- PT-PP-01_Planteamiento_del_Problema.md
- PT-IGS-01_Informe_General_del_Sistema.md
- PT-ERS-01_Especificacion_de_Requisitos.md

## Formato

- Documento Markdown
- Estructura clara con secciones numeradas
- Tablas para información estructurada
- Enlaces a documentos fuente cuando sea relevante
- Lenguaje claro y técnico pero accesible

## Resultado Esperado

Un documento de contexto completo que sirva como punto de entrada para cualquier persona que necesite entender rápidamente qué es la aplicación, para qué sirve, cómo está estructurada y qué tecnologías utiliza, con información precisa sobre el backend Java Spring Boot.

### To-dos

- [ ] Analizar los 3 documentos de referencia para extraer información clave sobre la aplicación
- [ ] Crear el archivo CONTEXTO_APLICACION.md con la estructura de secciones definida
- [ ] Escribir sección de introducción y visión general del sistema
- [ ] Documentar características principales y diferenciales (especialmente IA)
- [ ] Documentar los 10 módulos principales con sus funcionalidades clave
- [ ] Documentar los 5 tipos de usuarios, roles y permisos
- [ ] Documentar arquitectura tecnológica con Java Spring Boot, Hibernate ORM y Spring Security
- [ ] Documentar aspectos de cumplimiento regulatorio y normativas
- [ ] Revisar que el documento cubra todos los aspectos importantes y esté completo

