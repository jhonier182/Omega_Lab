# Sistema PLM/LIMS para Proscience Lab

### Informe final del trabajo de grado

*Este documento permite dar una visión general del sistema a nivel de características, funcionalidades, mapa de navegación, historias de usuario entre otros.*

**NOMBRE PROYECTO**

Sistema Integral PLM/LIMS (Product Lifecycle Management / Laboratory Information Management System) con Asistencia de IA para la Gestión del Ciclo de Vida de Productos Nutracéuticos y Suplementos Dietarios

**Nombre Estudiante**

[Pendiente de completar]

**Nombre Estudiante**

[Pendiente de completar]

**CENTRO DE FORMACIÓN**

[Pendiente de completar]

**TITULACIÓN**

[Pendiente de completar]

**CIUDAD**

[Pendiente de completar]

**AÑO**

2024

## TABLA DE CONTENIDO

1. [INTRODUCCIÓN](#1-introducción)
2. [OBJETIVO](#2-objetivo)
3. [ALCANCE](#3-alcance)
4. [SITUACIÓN ACTUAL](#4-situación-actual)
5. [SITUACIÓN ESPERADA](#5-situación-esperada)
6. [JUSTIFICACIÓN](#6-justificación)
7. [CARACTERÍSTICAS DEL SISTEMA](#7-características-del-sistema)
8. [USUARIOS – ROLES](#8-usuarios--roles)
   - 8.1 [Usuario](#81-usuario)
   - 8.2 [Analista](#82-analista)
   - 8.3 [Supervisor](#83-supervisor)
   - 8.4 [QA Manager](#84-qa-manager)
   - 8.5 [Administrador](#85-administrador)
9. [Diagrama de Casos de Uso](#9-diagrama-de-casos-de-uso)
   - 9.1 [General](#91-general)
   - 9.2 [Específicos](#92-específicos)
     - 9.2.1 [Autenticación y Autorización](#921-autenticación-y-autorización)
     - 9.2.2 [Dashboard](#922-dashboard)
     - 9.2.3 [Ideas/Research](#923-ideasresearch)
     - 9.2.4 [Formulación](#924-formulación)
     - 9.2.5 [IA/Simulación](#925-iasimulación)
     - 9.2.6 [Producción](#926-producción)
     - 9.2.7 [Pruebas/Control de Calidad (LIMS)](#927-pruebascontrol-de-calidad-lims)
     - 9.2.8 [Aprobación/QA](#928-aprobaciónqa)
     - 9.2.9 [Trazabilidad](#929-trazabilidad)
     - 9.2.10 [Base de Conocimiento](#9210-base-de-conocimiento)
     - 9.2.11 [Configuración](#9211-configuración)
10. [HISTORIAS DE USUARIO](#10-historias-de-usuario)

## 1. INTRODUCCIÓN

La industria de nutracéuticos y suplementos dietarios en Colombia ha experimentado un crecimiento significativo en los últimos años, impulsado por el aumento en la conciencia sobre salud y bienestar. Sin embargo, esta industria enfrenta desafíos regulatorios cada vez más estrictos, especialmente con las normativas de Buenas Prácticas de Manufactura (BPM) establecidas en el Decreto 3249 de 2006.

El INVIMA (Instituto Nacional de Vigilancia de Medicamentos y Alimentos) ha intensificado las inspecciones y auditorías, exigiendo mayor rigor en el cumplimiento de normativas, especialmente en aspectos relacionados con trazabilidad completa de lotes, integridad de datos, control de calidad, documentación de procesos y gestión de no conformidades.

Prosience Lab, como empresa comprometida con la calidad y el cumplimiento normativo, requiere un sistema que no solo cumpla con los requisitos regulatorios, sino que también mejore la eficiencia operativa y facilite la innovación mediante el uso de inteligencia artificial para la creación de nuevas fórmulas utilizando productos del inventario existente.

Este documento presenta el Informe General del Sistema PLM/LIMS, una solución integral híbrida diseñada específicamente para asistir en la creación de nuevas fórmulas de productos nutracéuticos y suplementos dietarios mediante inteligencia artificial, utilizando los productos y materias primas existentes en el inventario. El sistema permite cumplir con las Buenas Prácticas de Manufactura (BPM) establecidas en el Decreto 3249 de 2006 del Ministerio de Salud y Protección Social de Colombia, garantizando trazabilidad completa, integridad de datos, control de calidad y cumplimiento regulatorio, mientras facilita la innovación y desarrollo de nuevos productos de manera eficiente y segura.

## 2. OBJETIVO

Desarrollar e implementar un sistema integral híbrido PLM/LIMS (Product Lifecycle Management / Laboratory Information Management System) diseñado específicamente para asistir en la creación de nuevas fórmulas de productos nutracéuticos y suplementos dietarios mediante inteligencia artificial, utilizando los productos y materias primas existentes en el inventario. El sistema permitirá cumplir con las Buenas Prácticas de Manufactura (BPM) establecidas en el Decreto 3249 de 2006 del Ministerio de Salud y Protección Social de Colombia, garantizando trazabilidad completa, integridad de datos, control de calidad y cumplimiento regulatorio, mientras facilita la innovación y desarrollo de nuevos productos de manera eficiente y segura.

**Objetivos Específicos:**

- Implementar un sistema de gestión del ciclo de vida del producto (PLM) que cubra desde la investigación hasta la aprobación y liberación
- Desarrollar un sistema de información de laboratorio (LIMS) para control de calidad y gestión de muestras
- Integrar inteligencia artificial para asistir en la creación de nuevas fórmulas utilizando productos del inventario existente
- Garantizar trazabilidad completa de lotes desde materias primas hasta distribución
- Implementar principios ALCOA+ para integridad de datos
- Facilitar el cumplimiento con normativas regulatorias colombianas (Decreto 3249 de 2006, Ley 1581 de 2012)
- Reducir el tiempo de desarrollo de productos en un 30-40%
- Reducir el tiempo de creación de nuevas fórmulas mediante asistencia de IA en un 40-50%
- Eliminar errores manuales en la gestión de formulaciones y BOM
- Mejorar la eficiencia operativa mediante automatización de procesos

## 3. ALCANCE

**Incluye:**

- Módulo de Dashboard con KPIs y métricas en tiempo real
- Módulo de Ideas/Research con integración a bases de datos moleculares (PubChem, ChEMBL, DrugBank, ZINC)
- Módulo de Formulación con gestión de BOM y control de versiones, incluyendo asistencia de IA
- Módulo de IA/Simulación para predicción de propiedades
- Módulo de Producción con órdenes de lote y dispensación digital
- Módulo de Pruebas/Control de Calidad (LIMS) con gestión de muestras
- Módulo de Aprobación/QA con firma digital y gestión de NC/CAPA
- Módulo de Trazabilidad de Lotes completo
- Módulo de Base de Conocimiento con control de versiones
- Módulo de Configuración de usuarios, roles y equipos
- Sistema de autenticación y autorización basado en roles (RBAC)
- API RESTful para integración con sistemas externos
- Interfaz web responsive y PWA (Progressive Web App)
- Integración con bases de datos moleculares para investigación
- Sistema de asistencia de IA para creación de fórmulas
- Predicción de propiedades fisicoquímicas
- Análisis de compatibilidad de ingredientes

**No incluye:**

- Integración con sistemas ERP existentes (fase futura)
- Módulo de facturación o contabilidad
- Sistema de gestión de inventario físico (solo trazabilidad)
- Integración con sistemas de distribución o logística externos
- Módulos de recursos humanos o nómina
- Integración directa con equipos de laboratorio (fase futura)

## 4. SITUACIÓN ACTUAL

**Procesos Manuales y Descentralizados en Creación de Fórmulas:**

- La creación de nuevas fórmulas se realiza manualmente sin asistencia tecnológica, requiriendo conocimiento extenso y tiempo considerable
- No existe un sistema que sugiera combinaciones inteligentes de productos del inventario para crear nuevas fórmulas
- La gestión de formulaciones y BOM se realiza principalmente en hojas de cálculo (Excel) y documentos físicos
- Dificultad para identificar qué productos del inventario pueden combinarse para crear nuevas fórmulas
- Falta de control de versiones centralizado, lo que genera confusión sobre qué versión es la vigente
- Dificultad para rastrear cambios y quién los realizó
- Alto riesgo de errores humanos en transcripción de datos y cálculo de proporciones
- No hay análisis previo de compatibilidad o propiedades de nuevas fórmulas antes de la producción

**Falta de Trazabilidad Integral:**

- No existe un sistema unificado que permita rastrear un lote desde las materias primas hasta el producto final distribuido
- La información está dispersa en múltiples sistemas o documentos
- Dificultad para realizar trazabilidad hacia atrás (backward) y hacia adelante (forward) cuando es necesario

**Gestión de Calidad Fragmentada:**

- Los resultados de pruebas analíticas se registran en hojas de cálculo o documentos físicos
- No hay integración entre el control de calidad y la producción
- Dificultad para gestionar y dar seguimiento a No Conformidades (NC) y Acciones Correctivas y Preventivas (CAPA)
- Falta de alertas automáticas para resultados fuera de especificación (OOS)

**Cumplimiento Regulatorio:**

- Preparación de auditorías requiere tiempo significativo para recopilar y organizar documentación
- Riesgo de no conformidades por falta de documentación adecuada
- Dificultad para demostrar integridad de datos en procesos manuales
- Falta de firma digital y control de acceso adecuado

**Gestión de Conocimiento:**

- Los SOPs, guías técnicas y farmacopeas están almacenados en diferentes ubicaciones
- No hay control de versiones de documentos
- Dificultad para encontrar información técnica relevante
- Riesgo de usar versiones desactualizadas de documentos

**Investigación y Desarrollo de Nuevas Fórmulas:**

- Creación de nuevas fórmulas es un proceso manual y lento que depende completamente de la experiencia del formulador
- No existe asistencia tecnológica para sugerir nuevas combinaciones de productos del inventario
- Dificultad para identificar qué productos disponibles pueden usarse en nuevas formulaciones
- Búsqueda manual en bases de datos moleculares, consumiendo tiempo significativo
- No hay historial de búsquedas o resultados guardados
- Falta de integración entre investigación, inventario disponible y formulación
- No hay predicción previa de propiedades o compatibilidad de nuevas fórmulas antes de producirlas
- Subutilización del inventario existente por falta de visibilidad de posibles combinaciones

**Ineficiencias Operativas:**

- Tiempo excesivo en tareas administrativas y de documentación
- Duplicación de esfuerzos al no tener información centralizada
- Dificultad para generar reportes y métricas en tiempo real
- Falta de visibilidad sobre el estado de lotes y procesos

## 5. SITUACIÓN ESPERADA

**Visión General:**

Con la implementación del sistema PLM/LIMS, Proscience Lab logrará una transformación digital completa de sus procesos, pasando de un modelo basado en documentos físicos y procesos manuales a un sistema integrado, digital y automatizado que garantice:

**Trazabilidad Completa y Transparente:**

- Cada lote será rastreable desde la recepción de materias primas hasta la distribución del producto final
- Información disponible en tiempo real sobre el estado y ubicación de cada lote
- Capacidad de realizar trazabilidad hacia atrás y hacia adelante en minutos, no días

**Integridad de Datos Garantizada:**

- Todos los registros cumplirán con principios ALCOA+
- Registros inalterables una vez firmados digitalmente
- Timestamps automáticos en todas las acciones
- Auditoría completa de cambios y accesos

**Cumplimiento Regulatorio Facilitado:**

- Sistema diseñado específicamente para cumplir con Decreto 3249 de 2006
- Documentación siempre lista para auditorías
- Reducción significativa de no conformidades
- Procesos validados y documentados

**Eficiencia Operativa Mejorada:**

- Reducción del 30-40% en tiempo de desarrollo de productos
- Reducción del 40-50% en tiempo de creación de nuevas fórmulas mediante asistencia de IA
- Automatización de tareas repetitivas
- Eliminación de errores manuales
- Información centralizada y accesible

**Gestión de Calidad Proactiva:**

- Alertas automáticas para resultados fuera de especificación
- Gestión sistemática de NC y CAPA
- Control de calibración de equipos integrado
- Reportes automáticos de calidad

**Innovación Acelerada con Asistencia de IA:**

- Creación rápida de nuevas fórmulas: Sistema de IA que sugiere combinaciones inteligentes de productos del inventario para crear nuevas fórmulas en minutos, no días
- Optimización del inventario: Identificación automática de oportunidades para desarrollar nuevos productos utilizando materias primas disponibles
- Predicción previa: Evaluación de propiedades y compatibilidad de nuevas fórmulas antes de la producción, reduciendo pruebas y errores
- Acceso rápido a información científica mediante integración con APIs
- Predicción de propiedades mediante IA
- Base de conocimiento centralizada
- Facilita desarrollo de nuevos productos de manera más rápida y eficiente
- Mejor utilización de recursos: Maximiza el uso de productos y materias primas del inventario existente

**Impacto Esperado:**

- Reducción del 40-50% en tiempo de creación de nuevas fórmulas mediante asistencia de IA
- Reducción del 30-40% en tiempo de desarrollo de productos
- Reducción del 50% en tiempo de preparación para auditorías
- Eliminación del 90% de errores manuales en formulaciones
- Reducción del 25% en no conformidades relacionadas con documentación
- Mejora del 40% en tiempo de respuesta a consultas de trazabilidad
- Aumento del 30% en utilización de productos del inventario para nuevas formulaciones
- Reducción del 35% en tiempo de pruebas de nuevas fórmulas gracias a predicción previa de propiedades

## 6. JUSTIFICACIÓN

**Necesidad Regulatoria:**

El Decreto 3249 de 2006 establece requisitos específicos para BPM que incluyen:
- Trazabilidad completa de lotes
- Documentación adecuada de todos los procesos
- Control de calidad sistemático
- Gestión de no conformidades
- Validación de sistemas computarizados

Un sistema manual o fragmentado no puede cumplir adecuadamente con estos requisitos, especialmente en aspectos de integridad de datos y trazabilidad.

**Necesidad Operativa:**

Los procesos actuales basados en documentos físicos y hojas de cálculo generan:
- Creación lenta de nuevas fórmulas: Proceso manual que requiere tiempo considerable y experiencia extensa del formulador
- Subutilización del inventario: Dificultad para identificar qué productos disponibles pueden combinarse para crear nuevas fórmulas
- Falta de asistencia tecnológica: No existe sistema que sugiera combinaciones inteligentes o analice compatibilidad antes de la producción
- Ineficiencias que afectan la productividad
- Riesgo de errores que pueden resultar en rechazos de lotes
- Dificultad para escalar operaciones
- Tiempo excesivo en tareas administrativas

**Necesidad Estratégica:**

Para mantener y mejorar su posición competitiva, Proscience Lab necesita:
- Diferenciación mediante calidad y cumplimiento demostrable
- Capacidad de innovar y desarrollar nuevos productos rápidamente
- Escalabilidad para crecer sin aumentar proporcionalmente costos operativos
- Base tecnológica sólida para futuras expansiones

**Beneficios de la Implementación:**

**Beneficios Regulatorios:**
- Cumplimiento garantizado: Sistema diseñado específicamente para cumplir con Decreto 3249 de 2006
- Preparación para auditorías: Documentación siempre lista, reduciendo tiempo de preparación en 50%
- Reducción de no conformidades: Procesos validados y documentados reducen riesgo de NC
- Integridad de datos: Principios ALCOA+ garantizan que los datos sean confiables y auditables
- Trazabilidad completa: Capacidad de rastrear cualquier lote en minutos

**Beneficios Operativos:**
- Creación acelerada de fórmulas: Asistencia de IA reduce el tiempo de creación de nuevas fórmulas en 40-50%, sugiriendo combinaciones inteligentes de productos del inventario
- Optimización de inventario: Identificación automática de oportunidades para crear nuevos productos utilizando materias primas disponibles
- Predicción previa: Evaluación de propiedades y compatibilidad antes de la producción, reduciendo pruebas y errores
- Eficiencia: Reducción del 30-40% en tiempo de desarrollo de productos
- Reducción de errores: Eliminación del 90% de errores manuales en formulaciones
- Automatización: Tareas repetitivas se automatizan, liberando tiempo del personal para actividades de mayor valor
- Centralización: Toda la información en un solo lugar, fácil de acceder
- Reportes automáticos: Generación automática de reportes y métricas
- Mejor aprovechamiento de recursos: Maximiza el uso de productos y materias primas del inventario existente

**Beneficios Financieros:**
- Reducción de costos: Menos rechazos de lotes, menos reprocesos, menos tiempo en auditorías
- ROI positivo: El ahorro en tiempo y reducción de errores justifica la inversión
- Escalabilidad: Crecimiento sin aumento proporcional de costos operativos
- Prevención de pérdidas: Evita costos asociados a no conformidades y sanciones

**Beneficios Estratégicos:**
- Competitividad: Diferencia competitiva mediante calidad y cumplimiento
- Innovación acelerada: Asistencia de IA facilita desarrollo de nuevos productos de manera más rápida
- Ventaja tecnológica: Uso de IA para formulación posiciona a Proscience Lab como líder en innovación tecnológica
- Optimización de recursos: Mejor aprovechamiento del inventario existente para crear nuevos productos
- Crecimiento: Base sólida para expansión futura
- Reputación: Mejora imagen corporativa y confianza de clientes
- Agilidad en desarrollo: Capacidad de responder rápidamente a oportunidades de mercado

## 7. CARACTERÍSTICAS DEL SISTEMA

- **Versión:** 1.0
- **Plataforma:** Web (Progressive Web App - PWA)
- **Tecnologías:**
  - Frontend: React 18 con Vite, Tailwind CSS, React Router
  - Backend: Java Spring Boot 4.0.0 con Java 21, Spring Data JPA (Hibernate), Spring Security
  - Base de Datos: MySQL 8.0+ con UTF8MB4
  - Autenticación: JWT (JSON Web Tokens) con Spring Security
  - Seguridad: Spring Security, CORS, Rate Limiting, Bcrypt
  - ORM: Spring Data JPA con Hibernate
- **Dispositivos Soportados:** Desktop, Tablet, Móvil (iOS y Android)
- **Orientación:** Horizontal y Vertical (responsive)
- **Soporte para diferentes densidades:** Sí, mediante diseño responsive y PWA

**Características Principales:**

- Asistencia de IA en Formulación: Sistema inteligente que ayuda a crear nuevas fórmulas utilizando productos y materias primas disponibles en el inventario existente
- Gestión del Ciclo de Vida del Producto (PLM): Desde la investigación y formulación asistida por IA hasta la aprobación y liberación
- Sistema de Información de Laboratorio (LIMS): Control de calidad, pruebas analíticas y gestión de muestras
- Trazabilidad Completa: Seguimiento de lotes desde materias primas hasta distribución
- Integridad de Datos: Registros inalterables con timestamps y firmas digitales
- Control de Versiones: Gestión de BOM (Bill of Materials) con historial de cambios
- Cumplimiento Regulatorio: Diseñado para cumplir con BPM y facilitar auditorías del INVIMA
- Base de Conocimiento: Repositorio centralizado de SOPs, guías y farmacopeas
- Integración con APIs Moleculares: Búsqueda en bases de datos científicas (PubChem, ChEMBL, DrugBank, ZINC) para investigación de ingredientes
- Simulación e IA Avanzada: Predicción de parámetros fisicoquímicos, análisis de compatibilidad de ingredientes y sugerencias inteligentes de formulación basadas en productos del inventario

### **Estado de Implementación Actual**

**Controladores Implementados:**
- ✅ **AuthController**: Registro de usuarios, inicio de sesión, perfil de usuario
- ✅ **ProductController**: Gestión de productos, creación y actualización de BOM, historial de versiones de BOM
- ✅ **MaterialController**: Gestión de materiales (materias primas), búsqueda y filtrado
- ✅ **CategoryController**: Gestión de categorías de productos y materiales
- ✅ **HealthController**: Endpoint de salud del sistema

**Modelos de Datos Implementados:**
- ✅ **User**: Usuarios del sistema con roles y autenticación
- ✅ **Product**: Productos terminados
- ✅ **Material**: Materias primas
- ✅ **Category**: Categorías de productos y materiales
- ✅ **BOM**: Listas de materiales con control de versiones
- ✅ **BOMItem**: Items individuales de las listas de materiales

**Funcionalidades Implementadas:**
- ✅ Sistema de autenticación y autorización con JWT
- ✅ Gestión de usuarios y roles
- ✅ Gestión de productos terminados
- ✅ Gestión de materias primas (materiales)
- ✅ Gestión de categorías
- ✅ Creación y gestión de BOM (Bill of Materials)
- ✅ Control de versiones de BOM con historial
- ✅ Gestión de items de BOM con cantidades y porcentajes
- ✅ Búsqueda y filtrado de productos y materiales

**Funcionalidades Pendientes:**
- ⏳ Módulo Dashboard con KPIs
- ⏳ Módulo Ideas/Research con integración a APIs moleculares
- ⏳ Asistencia de IA para formulación
- ⏳ Módulo de Producción
- ⏳ Módulo de Pruebas/Control de Calidad (LIMS)
- ⏳ Módulo de Aprobación/QA
- ⏳ Módulo de Trazabilidad
- ⏳ Módulo de Base de Conocimiento

## 8. USUARIOS – ROLES

### 8.1 Analista de Laboratorio

**Descripción:**

Auxiliar de I+D que recibe órdenes de formulación. No tiene acceso a base de datos con fórmulas reales. Solo cumple requerimientos especificados en órdenes, desarrollo de la misma e ingreso del análisis sensorial.

**Permisos:**

- Lectura de información de productos y lotes
- Registro de actividades básicas de producción
- Visualización de dashboard
- Consulta de trazabilidad (solo lectura)
- Acceso a base de conocimiento (solo lectura)
- Gestión de materiales y categorías
- Lectura de formulaciones (solo órdenes asignadas)

**Módulos accesibles:**

- Dashboard (lectura)
- Producción (registro de actividades básicas)
- Trazabilidad (solo lectura)
- Base de Conocimiento (solo lectura)
- Inventario (materias primas)
- Formulación (solo órdenes asignadas)

**Restricciones:**

- No puede crear o modificar formulaciones reales en la base de datos
- No puede aprobar lotes
- No puede gestionar usuarios
- No puede acceder a configuración del sistema

### 8.2 Supervisor de Calidad

**Descripción:**

Recibe materias primas, ingresa datos de proveedor, lotes, trazabilidad. Lleva el informe del estado del análisis de materias primas antes de pasar a formulación. Hace devoluciones de materias primas no aptas. No tiene permisos sobre análisis de formulaciones.

**Permisos:**

- Supervisión de procesos de calidad
- Gestión de materias primas y recepción
- Ingreso de datos de proveedores y lotes
- Gestión de trazabilidad de materias primas
- Análisis de materias primas
- Devolución de materias primas no aptas
- Visualización de métricas de calidad

**Módulos accesibles:**

- Dashboard (acceso completo)
- Ideas/Research
- Formulación (solo lectura de materias primas)
- Producción (gestión de materias primas)
- Pruebas/LIMS (acceso completo)
- Trazabilidad (acceso completo)
- Base de Conocimiento
- Inventario (materias primas - acceso completo)

**Restricciones:**

- No puede aprobar liberación final de productos
- No puede gestionar usuarios
- No puede acceder a configuración del sistema
- No tiene permisos sobre análisis de formulaciones

### 8.3 Supervisor QA

**Descripción:**

Acceso completo a fórmulas reales en la base de datos. Visión total del sistema, recibe notificaciones de stock, lotes, trazabilidad, documentos, reportes, alertas. Puede ver el estado de formulación y quién está operando.

**Permisos:**

- Aprobación de productos con firma digital
- Gestión completa de No Conformidades (NC)
- Gestión completa de CAPA
- Liberación de lotes
- Acceso completo a todas las fórmulas en la base de datos
- Visualización completa del estado del sistema
- Recepción de notificaciones de stock, lotes, trazabilidad
- Generación de reportes regulatorios

**Módulos accesibles:**

- Todos los módulos con permisos de aprobación
- Dashboard (acceso completo)
- Ideas/Research
- Formulación (acceso completo a fórmulas reales)
- IA/Simulación
- Producción
- Pruebas/LIMS
- Aprobación/QA (acceso completo)
- Trazabilidad
- Base de Conocimiento
- Inventario (acceso completo)

**Restricciones:**

- No puede gestionar usuarios
- No puede acceder a configuración del sistema (excepto parámetros de QA)

### 8.4 Administrador

**Descripción:**

Administrador / Usuario Avanzado: Soporte técnico del sistema, puede otorgar roles. Tiene acceso completo al sistema.

**Permisos:**

- Acceso completo a todos los módulos sin restricciones
- Gestión de usuarios y roles
- Configuración del sistema
- Gestión de equipos
- Configuración de parámetros
- Acceso a logs y auditoría
- Gestión de backups
- Otorgar y modificar roles de usuarios

**Módulos accesibles:**

- Todos los módulos sin restricciones
- Configuración (acceso completo)

**Restricciones:**

- Debe seguir procedimientos de validación para cambios críticos
- Debe documentar todos los cambios en configuración


## 9. Diagrama de Casos de Uso

*En esta sección se deben especificar los casos de uso del sistema a construir, inicialmente se definen el diagrama general de casos de uso y posteriormente los subsistemas o diagramas específicos.*

### 9.1 General

[Insertar Diagrama de Casos de Uso General del Sistema PLM/LIMS]

El diagrama general muestra los principales actores del sistema (Usuario, Analista, Supervisor, QA Manager, Administrador) y los módulos principales del sistema (Autenticación, Dashboard, Ideas/Research, Formulación, IA/Simulación, Producción, Pruebas/LIMS, Aprobación/QA, Trazabilidad, Base de Conocimiento, Configuración).

### 9.2 Específicos

### 9.2.1 Autenticación y Autorización

[Insertar Diagrama de Casos de Uso para Autenticación y Autorización]

**Casos de uso principales:**
- Iniciar sesión
- Cerrar sesión
- Recuperar contraseña
- Gestionar usuarios (Administrador)
- Gestionar roles y permisos (Administrador)

### 9.2.2 Dashboard

[Insertar Diagrama de Casos de Uso para Dashboard]

**Casos de uso principales:**
- Visualizar KPIs en tiempo real
- Visualizar lotes pendientes
- Visualizar no conformidades activas
- Recibir alertas y notificaciones
- Exportar reportes

### 9.2.3 Ideas/Research

[Insertar Diagrama de Casos de Uso para Ideas/Research]

**Casos de uso principales:**
- Buscar en bases de datos moleculares
- Guardar resultados de investigación
- Consultar historial de búsquedas
- Analizar propiedades de compuestos
- Comparar ingredientes

### 9.2.4 Formulación

[Insertar Diagrama de Casos de Uso para Formulación]

**Casos de uso principales:**
- Crear nueva fórmula
- Solicitar sugerencias de IA para formulación
- Analizar inventario disponible
- Gestionar BOM con control de versiones
- Agregar justificación técnica
- Validar proporciones
- Comparar versiones de formulaciones

### 9.2.5 IA/Simulación

[Insertar Diagrama de Casos de Uso para IA/Simulación]

**Casos de uso principales:**
- Predecir propiedades fisicoquímicas
- Analizar compatibilidad de ingredientes
- Optimizar formulaciones
- Extraer datos de documentos científicos
- Analizar tendencias

### 9.2.6 Producción

[Insertar Diagrama de Casos de Uso para Producción]

**Casos de uso principales:**
- Crear orden de lote
- Realizar dispensación digital de materiales
- Realizar line clearance
- Seguir estado de lotes
- Registrar actividades de producción

### 9.2.7 Pruebas/Control de Calidad (LIMS)

[Insertar Diagrama de Casos de Uso para Pruebas/Control de Calidad]

**Casos de uso principales:**
- Registrar muestra
- Registrar prueba analítica
- Gestionar resultados OOS
- Controlar calibración de equipos
- Recibir alertas automáticas para OOS

### 9.2.8 Aprobación/QA

[Insertar Diagrama de Casos de Uso para Aprobación/QA]

**Casos de uso principales:**
- Liberar producto con firma digital
- Gestionar No Conformidades (NC)
- Gestionar CAPA
- Controlar cambios
- Aprobar lotes para distribución

### 9.2.9 Trazabilidad

[Insertar Diagrama de Casos de Uso para Trazabilidad]

**Casos de uso principales:**
- Rastrear lote completo
- Realizar trazabilidad hacia atrás
- Realizar trazabilidad hacia adelante
- Gestionar retiros del mercado
- Exportar reportes de trazabilidad

### 9.2.10 Base de Conocimiento

[Insertar Diagrama de Casos de Uso para Base de Conocimiento]

**Casos de uso principales:**
- Gestionar SOPs
- Controlar versiones de documentos
- Buscar documentos
- Visualizar documentos
- Comparar versiones de documentos

### 9.2.11 Configuración

[Insertar Diagrama de Casos de Uso para Configuración]

**Casos de uso principales:**
- Gestionar usuarios (Administrador)
- Gestionar roles y permisos (Administrador)
- Configurar equipos
- Configurar parámetros del sistema
- Configurar alertas y notificaciones

## 10. HISTORIAS DE USUARIO

---

### **Historia de Usuario 1:**

**ID:** HU01

**Como** Administrador

**Quiero** registrar nuevos usuarios en el sistema

**Para que** pueda gestionar el acceso de personal al sistema según sus roles y responsabilidades

**Criterios de Aceptación:**

- El sistema valida que el email sea único
- La contraseña se encripta con bcrypt antes de almacenarse
- Se asigna un rol válido (usuario, analista, supervisor, qa_manager, admin)
- Se registra timestamp de creación
- Solo administradores pueden crear usuarios

---

### **Historia de Usuario 2:**

**ID:** HU02

**Como** Usuario autenticado

**Quiero** iniciar sesión en el sistema con email y contraseña

**Para que** pueda acceder a las funcionalidades según mi rol

**Criterios de Aceptación:**

- El sistema valida email y contraseña
- Se genera token JWT con información del usuario y rol
- El token tiene tiempo de expiración configurable
- Se registra timestamp de último acceso
- Usuarios inactivos no pueden iniciar sesión

---

### **Historia de Usuario 3:**

**ID:** HU03

**Como** Usuario del sistema

**Quiero** visualizar KPIs en tiempo real en el dashboard

**Para que** pueda tener una visión general del estado de producción, calidad y cumplimiento

**Criterios de Aceptación:**

- Los KPIs se actualizan automáticamente cada X minutos
- Incluye métricas: lotes en producción, lotes pendientes, no conformidades activas
- Se pueden filtrar por período de tiempo
- Los datos se muestran en formato visual (gráficos, tablas)
- El tiempo de carga es menor a 3 segundos

---

### **Historia de Usuario 4:**

**ID:** HU04

**Como** Analista

**Quiero** buscar información de compuestos químicos en bases de datos moleculares

**Para que** pueda investigar ingredientes para nuevas formulaciones

**Criterios de Aceptación:**

- Se puede buscar por nombre, CAS, SMILES, fórmula molecular
- Se integra con al menos 2 bases de datos moleculares (PubChem, ChEMBL, DrugBank, ZINC)
- Los resultados incluyen propiedades fisicoquímicas
- Se pueden guardar resultados para uso posterior
- El tiempo de búsqueda es menor a 10 segundos

---

### **Historia de Usuario 5:**

**ID:** HU05

**Como** Formulador

**Quiero** solicitar sugerencias de IA para crear nuevas fórmulas utilizando productos del inventario

**Para que** pueda crear nuevas fórmulas de manera más rápida y eficiente

**Criterios de Aceptación:**

- El sistema analiza todos los productos disponibles en inventario
- Genera al menos 3 sugerencias de combinaciones
- Cada sugerencia incluye proporciones recomendadas
- Las sugerencias consideran compatibilidad de ingredientes
- Las sugerencias incluyen justificación técnica
- El usuario puede aceptar, modificar o rechazar sugerencias

---

### **Historia de Usuario 6:**

**ID:** HU06

**Como** Formulador

**Quiero** crear nuevas fórmulas agregando ingredientes del inventario

**Para que** pueda desarrollar nuevos productos

**Criterios de Aceptación:**

- Se puede crear fórmula con nombre y descripción
- Se pueden agregar ingredientes del inventario
- Se pueden definir proporciones en porcentaje o cantidad
- Se valida que las proporciones sumen 100%
- Se guarda con control de versiones
- Se puede duplicar fórmula existente

---

### **Historia de Usuario 7:**

**ID:** HU07

**Como** Formulador

**Quiero** analizar el inventario disponible para formulaciones

**Para que** pueda identificar qué productos y materias primas están disponibles para uso en nuevas formulaciones

**Criterios de Aceptación:**

- Se muestran todos los productos disponibles en inventario
- Se indica cantidad disponible de cada producto
- Se muestra estado del producto (activo, inactivo, en cuarentena)
- Se pueden filtrar por tipo de producto
- Se puede buscar por nombre o código
- Se muestra fecha de vencimiento si aplica

---

### **Historia de Usuario 8:**

**ID:** HU08

**Como** Formulador

**Quiero** gestionar BOM con control de versiones

**Para que** pueda mantener historial completo de cambios y comparar versiones

**Criterios de Aceptación:**

- Cada cambio crea una nueva versión del BOM
- Se mantiene historial completo de versiones
- Se puede comparar dos versiones
- Se puede restaurar versión anterior
- Cada versión tiene número, fecha, usuario que modificó
- Se puede ver diferencia entre versiones

---

### **Historia de Usuario 9:**

**ID:** HU09

**Como** Usuario del módulo IA/Simulación

**Quiero** predecir propiedades fisicoquímicas de nuevas fórmulas

**Para que** pueda evaluar las propiedades antes de la producción

**Criterios de Aceptación:**

- El sistema predice al menos: pH, viscosidad, densidad, estabilidad
- Las predicciones tienen un nivel de confianza asociado
- Se muestran comparaciones con fórmulas similares históricas
- Las predicciones se guardan con la formulación

---

### **Historia de Usuario 10:**

**ID:** HU10

**Como** Usuario del módulo IA/Simulación

**Quiero** analizar la compatibilidad entre ingredientes de una fórmula

**Para que** pueda identificar posibles incompatibilidades antes de la producción

**Criterios de Aceptación:**

- Se analiza compatibilidad entre todos los ingredientes
- Se identifican incompatibilidades conocidas
- Se muestran alertas de incompatibilidad
- Se sugiere alternativas si hay incompatibilidad
- El análisis se realiza en tiempo real mientras se crea la fórmula

---

### **Historia de Usuario 11:**

**ID:** HU11

**Como** Supervisor de Producción

**Quiero** crear órdenes de lote para producción

**Para que** pueda iniciar el proceso de producción de un producto

**Criterios de Aceptación:**

- Se puede crear orden de lote desde fórmula aprobada
- Se asigna número único de lote automáticamente
- Se define cantidad a producir
- Se asigna responsable de producción
- Se establece fecha programada
- Se genera BOM de producción automáticamente

---

### **Historia de Usuario 12:**

**ID:** HU12

**Como** Usuario de Producción

**Quiero** realizar dispensación digital de materiales

**Para que** pueda registrar la dispensación de materiales para producción de manera digital

**Criterios de Aceptación:**

- Se valida disponibilidad de materiales antes de dispensar
- Se registra cantidad dispensada con timestamp
- Se registra usuario que realiza dispensación
- Se actualiza inventario automáticamente
- Se genera registro de trazabilidad
- Se valida que cantidades no excedan disponibles

---

### **Historia de Usuario 13:**

**ID:** HU13

**Como** Supervisor

**Quiero** realizar line clearance (limpieza y liberación de líneas)

**Para que** pueda verificar que las líneas estén limpias antes del siguiente lote

**Criterios de Aceptación:**

- Se registran verificaciones de limpieza
- Se pueden adjuntar fotos o documentos
- Se requiere firma digital del supervisor
- Se registra timestamp de liberación
- La línea queda disponible para siguiente lote
- Se mantiene historial de line clearances

---

### **Historia de Usuario 14:**

**ID:** HU14

**Como** Analista de Control de Calidad

**Quiero** registrar muestras tomadas de lotes

**Para que** pueda gestionar las muestras para pruebas analíticas

**Criterios de Aceptación:**

- Se asigna número único de muestra automáticamente
- Se vincula muestra con lote de origen
- Se registra: fecha de toma, responsable, tipo de muestra
- Se registra cadena de custodia
- Se puede adjuntar información adicional
- Se puede buscar muestra por número o lote

---

### **Historia de Usuario 15:**

**ID:** HU15

**Como** Analista de Control de Calidad

**Quiero** registrar resultados de pruebas analíticas

**Para que** pueda documentar los resultados de las pruebas realizadas a las muestras

**Criterios de Aceptación:**

- Se registra método analítico utilizado
- Se ingresan valores numéricos obtenidos
- Se valida contra especificaciones del producto
- Se registra conclusión (conforme/no conforme)
- Se registra analista responsable
- Se registra fecha y hora de prueba
- Se puede adjuntar gráficos o datos adicionales

---

### **Historia de Usuario 16:**

**ID:** HU16

**Como** Analista de Control de Calidad

**Quiero** gestionar resultados OOS (Out of Specification)

**Para que** pueda investigar y documentar resultados fuera de especificación

**Criterios de Aceptación:**

- Se detecta automáticamente resultado OOS
- Se inicia proceso de investigación obligatorio
- Se registran hallazgos de investigación
- Se puede vincular con NC y CAPA
- Se requiere aprobación antes de cerrar investigación
- Se mantiene historial completo de investigación

---

### **Historia de Usuario 17:**

**ID:** HU17

**Como** QA Manager

**Quiero** liberar productos con firma digital

**Para que** pueda aprobar lotes para distribución de manera segura y cumpliendo con normativas

**Criterios de Aceptación:**

- Solo usuarios con rol qa_manager o admin pueden firmar
- La firma incluye: usuario, timestamp, hash del documento
- Una vez firmado, el registro no puede modificarse
- Se registra en auditoría la acción de firma
- Se cumple con principios ALCOA+

---

### **Historia de Usuario 18:**

**ID:** HU18

**Como** QA Manager

**Quiero** gestionar No Conformidades (NC)

**Para que** pueda documentar, investigar y dar seguimiento a no conformidades

**Criterios de Aceptación:**

- Se puede crear NC con descripción y clasificación
- Se asigna número único automáticamente
- Se clasifica por tipo y severidad
- Se asigna responsable de investigación
- Se puede vincular con lote, muestra o proceso
- Se da seguimiento hasta cierre
- Se requiere aprobación para cerrar NC

---

### **Historia de Usuario 19:**

**ID:** HU19

**Como** QA Manager

**Quiero** gestionar CAPA (Acciones Correctivas y Preventivas)

**Para que** pueda definir y dar seguimiento a acciones correctivas y preventivas

**Criterios de Aceptación:**

- Se puede crear CAPA vinculada a NC
- Se definen acciones correctivas y preventivas
- Se asigna responsable y fecha de vencimiento
- Se da seguimiento al cumplimiento
- Se alerta cuando está por vencer
- Se requiere evidencia para cerrar CAPA
- Se requiere aprobación para cerrar

---

### **Historia de Usuario 20:**

**ID:** HU20

**Como** Usuario del sistema

**Quiero** rastrear un lote completo desde materias primas hasta distribución

**Para que** pueda tener trazabilidad completa del lote

**Criterios de Aceptación:**

- El sistema muestra línea de tiempo completa del lote
- Incluye: recepción de materias primas, producción, pruebas, aprobación, distribución
- Se puede filtrar por tipo de evento
- Se puede exportar reporte de trazabilidad
- La información es accesible en menos de 5 segundos

---

### **Historia de Usuario 21:**

**ID:** HU21

**Como** Usuario del sistema

**Quiero** realizar trazabilidad hacia atrás desde un producto final hasta materias primas

**Para que** pueda identificar el origen de los ingredientes de un producto

**Criterios de Aceptación:**

- Se puede rastrear desde producto final hasta materias primas
- Se muestra toda la cadena de suministro
- Se incluyen: proveedores, fechas de recepción, números de lote
- Se puede exportar reporte de trazabilidad hacia atrás
- La información se muestra en formato de árbol o línea de tiempo

---

### **Historia de Usuario 22:**

**ID:** HU22

**Como** Usuario del sistema

**Quiero** realizar trazabilidad hacia adelante desde una materia prima hasta productos finales

**Para que** pueda identificar en qué productos se utilizó una materia prima específica

**Criterios de Aceptación:**

- Se puede rastrear desde materia prima hasta productos finales
- Se muestra en qué lotes se utilizó
- Se muestra distribución de productos finales
- Se incluyen: clientes, fechas de distribución, números de lote
- Se puede exportar reporte de trazabilidad hacia adelante

---

### **Historia de Usuario 23:**

**ID:** HU23

**Como** Usuario del sistema

**Quiero** gestionar SOPs (Procedimientos Operativos Estándar)

**Para que** pueda mantener documentación actualizada y accesible

**Criterios de Aceptación:**

- Se pueden crear, editar y eliminar SOPs
- Se mantiene control de versiones
- Se requiere aprobación antes de publicar
- Se puede buscar SOPs por nombre, categoría, número
- Se muestra versión vigente
- Se puede acceder a versiones anteriores

---

### **Historia de Usuario 24:**

**ID:** HU24

**Como** Usuario del sistema

**Quiero** buscar documentos en la base de conocimiento

**Para que** pueda encontrar información técnica relevante rápidamente

**Criterios de Aceptación:**

- Se puede buscar por texto en contenido
- Se puede filtrar por tipo, categoría, fecha
- Los resultados se ordenan por relevancia
- Se muestra vista previa del documento
- Se puede acceder directamente al documento
- El tiempo de búsqueda es menor a 3 segundos

---

### **Historia de Usuario 25:**

**ID:** HU25

**Como** Administrador

**Quiero** gestionar roles y permisos del sistema

**Para que** pueda controlar el acceso a funcionalidades según roles organizacionales

**Criterios de Aceptación:**

- Se pueden ver todos los roles definidos
- Se pueden modificar permisos de cada rol
- Los cambios se aplican inmediatamente
- Se valida que al menos un rol tenga permisos de administración
- Se registra quién modificó permisos
- Se mantiene historial de cambios de permisos

---

### **Historia de Usuario 26:**

**ID:** HU26

**Como** Administrador

**Quiero** configurar equipos de laboratorio y producción

**Para que** pueda gestionar la información y calibración de equipos

**Criterios de Aceptación:**

- Se pueden crear, editar y desactivar equipos
- Se registra información: nombre, tipo, modelo, serie
- Se configura frecuencia de calibración
- Se vincula con control de calibración
- Se valida calibración antes de usar en pruebas
- Se mantiene historial de configuraciones



**Fin del Documento**

