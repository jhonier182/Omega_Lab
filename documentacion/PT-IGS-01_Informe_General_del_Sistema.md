# 📊 Informe General del Sistema
## Omega Lab - Sistema PLM/LIMS
**Versión:** 1.0

---

> 💡 **Informe final del trabajo de grado**
> 
> Este documento permite dar una visión general del sistema a nivel de características, funcionalidades, mapa de navegación, historias de usuario entre otros.

---

## 📋 Información del Proyecto

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

---

## 📑 Tabla de Contenido

1. [Introducción](#1-introducción)
2. [Objetivo](#2-objetivo)
3. [Alcance](#3-alcance)
4. [Situación Actual](#4-situación-actual)
5. [Situación Esperada](#5-situación-esperada)
6. [Justificación](#6-justificación)
7. [Flujo del Proceso del Sistema](#7-flujo-del-proceso-del-sistema)
8. [Características del Sistema](#8-características-del-sistema)
9. [Usuarios – Roles](#9-usuarios--roles)
   - 9.1 [Analista de Laboratorio](#91-analista-de-laboratorio)
   - 9.2 [Supervisor](#92-supervisor)
   - 9.3 [SupervisorQA (Supervisor de Calidad - Mayor Rango)](#93-supervisorqa-supervisor-de-calidad---mayor-rango)
   - 9.4 [Administrador](#94-administrador)
10. [Diagrama de Casos de Uso](#10-diagrama-de-casos-de-uso)
   - 10.1 [General](#101-general)
   - 10.2 [Específicos](#102-específicos)
11. [Historias de Usuario](#11-historias-de-usuario)

---

## 1. Introducción

La industria de nutracéuticos y suplementos dietarios en Colombia ha experimentado un crecimiento significativo en los últimos años, impulsado por el aumento en la conciencia sobre salud y bienestar. Sin embargo, esta industria enfrenta desafíos regulatorios cada vez más estrictos, especialmente con las normativas de Buenas Prácticas de Manufactura (BPM) establecidas en el Decreto 3249 de 2006.

El INVIMA (Instituto Nacional de Vigilancia de Medicamentos y Alimentos) ha intensificado las inspecciones y auditorías, exigiendo mayor rigor en el cumplimiento de normativas, especialmente en aspectos relacionados con trazabilidad completa de lotes, integridad de datos, control de calidad, documentación de procesos y gestión de no conformidades.

Omega Lab, como empresa comprometida con la calidad y el cumplimiento normativo, requiere un sistema que no solo cumpla con los requisitos regulatorios, sino que también mejore la eficiencia operativa y facilite la innovación mediante el uso de inteligencia artificial para la creación de nuevas fórmulas utilizando productos del inventario existente.

Este documento presenta el Informe General del Sistema PLM/LIMS, una solución integral diseñada específicamente para laboratorios de creación de fórmulas químicas. El sistema permite generar nuevas fórmulas a partir de productos y formulaciones ya preparadas mediante inteligencia artificial, simplificando el proceso de formulación para empresas, garantizando trazabilidad limpia y mejor control de auditoría.

**Flujo del Proceso:**
1. **SupervisorQA** (mayor rango) genera ideas usando IA basadas en productos/formulaciones existentes
2. Las ideas generadas se asignan al **Analista** para desarrollo y pruebas
3. El **Analista** realiza las pruebas y puede aceptar o rechazar la idea
4. Se envía notificación al **SupervisorQA** con el resultado
5. El **SupervisorQA** determina si la idea es aceptada para producción según el estado

El sistema permite cumplir con las Buenas Prácticas de Manufactura (BPM) establecidas en el Decreto 3249 de 2006 del Ministerio de Salud y Protección Social de Colombia, garantizando trazabilidad completa, integridad de datos, control de calidad y cumplimiento regulatorio.

---

## 2. Objetivo

Desarrollar e implementar un sistema integral PLM/LIMS (Product Lifecycle Management / Laboratory Information Management System) diseñado específicamente para laboratorios de creación de fórmulas químicas. El sistema permite generar nuevas fórmulas a partir de productos y formulaciones ya preparadas mediante inteligencia artificial, simplificando el proceso de formulación para empresas, garantizando trazabilidad limpia y mejor control de auditoría.

**Flujo Principal del Sistema:**

1. **Generación de Ideas (SupervisorQA)**: El SupervisorQA selecciona un producto existente con su formulación y define un objetivo. El sistema utiliza IA para generar nuevas ideas de fórmulas basándose en el producto y los materiales disponibles en inventario.

2. **Desarrollo y Pruebas (Analista)**: Las ideas generadas se asignan a analistas que las desarrollan en el laboratorio, realizan pruebas y determinan si son viables o deben rechazarse.

3. **Aprobación (SupervisorQA)**: El SupervisorQA recibe notificaciones con los resultados de las pruebas y determina si la idea es aceptada para producción o rechazada según el estado y criterios de calidad.

El sistema permite cumplir con las Buenas Prácticas de Manufactura (BPM) establecidas en el Decreto 3249 de 2006 del Ministerio de Salud y Protección Social de Colombia, garantizando trazabilidad completa, integridad de datos, control de calidad y cumplimiento regulatorio.

**Objetivos Específicos:**

- ✅ Simplificar el proceso de formulación para empresas mediante generación automática de ideas
- ✅ Implementar un flujo de trabajo estructurado: Generación (SupervisorQA) → Desarrollo/Pruebas (Analista) → Aprobación (SupervisorQA)
- ✅ Integrar inteligencia artificial para generar nuevas fórmulas basándose en productos y formulaciones existentes
- ✅ Garantizar trazabilidad limpia y completa de todo el proceso de creación de fórmulas
- ✅ Mejorar el control de auditoría mediante registro detallado de todas las acciones y decisiones
- ✅ Implementar un sistema de información de laboratorio (LIMS) para gestión de pruebas y resultados
- ✅ Implementar principios ALCOA+ para integridad de datos
- ✅ Facilitar el cumplimiento con normativas regulatorias colombianas (Decreto 3249 de 2006, Ley 1581 de 2012)
- ✅ Reducir el tiempo de creación de nuevas fórmulas mediante asistencia de IA en un 40-50%
- ✅ Eliminar errores manuales en la gestión de formulaciones y BOM
- ✅ Mejorar la eficiencia operativa mediante automatización de procesos y notificaciones

---

## 3. Alcance

**Incluye:**

- ✅ Módulo de Dashboard con KPIs y métricas en tiempo real
- ✅ Módulo de Ideas/Research con integración a bases de datos moleculares (PubChem, ChEMBL, DrugBank, ZINC)
- ✅ Módulo de Formulación con gestión de BOM y control de versiones, incluyendo asistencia de IA
- ✅ Módulo de IA/Simulación para predicción de propiedades
- ✅ Módulo de Producción con órdenes de lote y dispensación digital
- ✅ Módulo de Pruebas/Control de Calidad (LIMS) con gestión de muestras
- ✅ Módulo de Aprobación/QA con firma digital y gestión de NC/CAPA
- ✅ Módulo de Trazabilidad de Lotes completo
- ✅ Módulo de Base de Conocimiento con control de versiones
- ✅ Módulo de Configuración de usuarios, roles y equipos
- ✅ Sistema de autenticación y autorización basado en roles (RBAC)
- ✅ API RESTful para integración con sistemas externos
- ✅ Interfaz web responsive y PWA (Progressive Web App)
- ✅ Integración con bases de datos moleculares para investigación
- ✅ Sistema de asistencia de IA para creación de fórmulas
- ✅ Predicción de propiedades fisicoquímicas
- ✅ Análisis de compatibilidad de ingredientes

**No incluye:**

- Integración con sistemas ERP existentes (fase futura)
- Módulo de facturación o contabilidad
- Sistema de gestión de inventario físico (solo trazabilidad)
- Integración con sistemas de distribución o logística externos
- Módulos de recursos humanos o nómina
- Integración directa con equipos de laboratorio (fase futura)

---

## 4. Situación Actual

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

---

## 5. Situación Esperada

**Visión General:**

Con la implementación del sistema PLM/LIMS, Omega Lab logrará una transformación digital completa de sus procesos, pasando de un modelo basado en documentos físicos y procesos manuales a un sistema integrado, digital y automatizado que garantice:

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

---

## 6. Justificación

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

Para mantener y mejorar su posición competitiva, Omega Lab necesita:
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
- Ventaja tecnológica: Uso de IA para formulación posiciona a Omega Lab como líder en innovación tecnológica
- Optimización de recursos: Mejor aprovechamiento del inventario existente para crear nuevos productos
- Crecimiento: Base sólida para expansión futura
- Reputación: Mejora imagen corporativa y confianza de clientes
- Agilidad en desarrollo: Capacidad de responder rápidamente a oportunidades de mercado

---

## 7. Flujo del Proceso del Sistema

### **7.1 Flujo Principal**

El sistema sigue un flujo estructurado de tres etapas principales:

**Etapa 1: Generación de Ideas (SupervisorQA)**
- El SupervisorQA selecciona un producto existente que tiene una formulación (BOM) definida
- Define un objetivo o interés para la nueva fórmula (ej: "aumentar absorción", "reducir costos", "mejorar sabor")
- El sistema utiliza inteligencia artificial (OpenAI) para analizar:
  - La formulación del producto base (BOM y BOMItems)
  - Los materiales disponibles en inventario
  - El objetivo definido
- El sistema genera una o más ideas de nuevas fórmulas con:
  - Título y descripción
  - Detalles técnicos generados por IA
  - Pruebas requeridas sugeridas
  - Prioridad y categoría
- El SupervisorQA revisa las ideas generadas y asigna las prometedoras a analistas

**Etapa 2: Desarrollo y Pruebas (Analista)**
- El Analista recibe notificación de nueva idea asignada
- Revisa la idea y la información del producto base
- Desarrolla la fórmula en el laboratorio según la idea
- Crea pruebas asociadas a la idea
- Registra resultados detallados de cada prueba realizada
- Basándose en los resultados, el Analista puede:
  - Aceptar la idea (si las pruebas son exitosas)
  - Rechazar la idea (si las pruebas fallan o no cumple criterios)
- El sistema notifica automáticamente al SupervisorQA del resultado

**Etapa 3: Aprobación Final (SupervisorQA)**
- El SupervisorQA recibe notificación con el estado de la idea y resultados de pruebas
- Revisa toda la información: idea original, pruebas realizadas, resultados
- Toma la decisión final:
  - **Aprobar para Producción**: Si la idea cumple todos los criterios de calidad
  - **Rechazar**: Si no cumple criterios o hay problemas identificados
- El sistema registra la decisión final con timestamp y usuario responsable

### **7.2 Estados de las Ideas**

Las ideas pasan por los siguientes estados durante su ciclo de vida:

- **GENERADA**: Idea creada por SupervisorQA mediante IA, pendiente de asignación
- **EN_PRUEBA**: Idea asignada a Analista, en proceso de desarrollo y pruebas
- **APROBADA**: Idea aprobada por Analista o SupervisorQA, lista para producción
- **RECHAZADA**: Idea rechazada por Analista o SupervisorQA

### **7.3 Trazabilidad**

El sistema mantiene trazabilidad completa de:
- Producto base utilizado para generar la idea
- Usuario que generó la idea (SupervisorQA)
- Analista asignado y responsable de pruebas
- Todas las pruebas realizadas con sus resultados
- Usuario que tomó la decisión final (SupervisorQA)
- Timestamps de todos los cambios de estado

---

## 8. Características del Sistema

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

- ✅ **Generación de Ideas mediante IA**: El SupervisorQA puede generar nuevas ideas de fórmulas basándose en productos existentes y sus formulaciones (BOM), utilizando inteligencia artificial para sugerir combinaciones inteligentes
- ✅ **Flujo de Trabajo Estructurado**: Sistema de asignación y seguimiento de ideas desde generación hasta aprobación para producción
- ✅ **Gestión de Pruebas (LIMS)**: Los analistas pueden crear y gestionar pruebas asociadas a ideas, registrando resultados detallados
- ✅ **Sistema de Notificaciones**: Notificaciones automáticas cuando las ideas cambian de estado o cuando los analistas completan pruebas
- ✅ **Trazabilidad Completa**: Seguimiento completo de todo el proceso: producto base → idea generada → pruebas realizadas → decisión final
- ✅ **Integridad de Datos**: Registros inalterables con timestamps y auditoría completa de todas las acciones
- ✅ **Control de Versiones**: Gestión de BOM (Bill of Materials) con historial completo de cambios
- ✅ **Cumplimiento Regulatorio**: Diseñado para cumplir con BPM y facilitar auditorías del INVIMA
- ✅ **Simplificación de Formulaciones**: Reduce la complejidad del proceso de creación de nuevas fórmulas para empresas
- ✅ **Control de Auditoría Mejorado**: Registro detallado de todas las decisiones y acciones para facilitar auditorías

### **Estado de Implementación Actual**

**Controladores Implementados:**

- ✅ **AuthController**: Registro de usuarios, inicio de sesión, perfil de usuario
- ✅ **ProductController**: Gestión de productos, creación y actualización de BOM, historial de versiones de BOM
- ✅ **MaterialController**: Gestión de materiales (materias primas), búsqueda y filtrado
- ✅ **CategoryController**: Gestión de categorías de productos y materiales
- ✅ **IdeaController**: Gestión de ideas generadas por IA, asignación a analistas, seguimiento de estado
- ✅ **PruebaController**: Gestión de pruebas realizadas por analistas, resultados y estados
- ✅ **HealthController**: Endpoint de salud del sistema

**Modelos de Datos Implementados:**
- ✅ **User**: Usuarios del sistema con roles y autenticación
- ✅ **Product**: Productos terminados con sus formulaciones (BOM)
- ✅ **Material**: Materias primas disponibles en inventario
- ✅ **Category**: Categorías de productos y materiales
- ✅ **BOM**: Listas de materiales (formulaciones) con control de versiones
- ✅ **BOMItem**: Items individuales de las listas de materiales
- ✅ **Idea**: Ideas de nuevas fórmulas generadas por IA, con estados y asignaciones
- ✅ **Prueba**: Pruebas realizadas por analistas sobre las ideas
- ✅ **ResultadoPrueba**: Resultados detallados de las pruebas realizadas

**Funcionalidades Implementadas:**
- ✅ Sistema de autenticación y autorización con JWT
- ✅ Gestión de usuarios y roles (Analista, Supervisor, SupervisorQA, Administrador)
- ✅ Gestión de productos terminados con sus formulaciones (BOM)
- ✅ Gestión de materias primas (materiales) disponibles en inventario
- ✅ Gestión de categorías de productos y materiales
- ✅ Creación y gestión de BOM (Bill of Materials) con control de versiones
- ✅ Control de versiones de BOM con historial completo
- ✅ Gestión de items de BOM con cantidades y porcentajes
- ✅ Búsqueda y filtrado de productos y materiales
- ✅ **Generación de ideas mediante IA**: El SupervisorQA puede generar nuevas ideas de fórmulas basadas en productos existentes
- ✅ **Gestión de ideas**: Creación, asignación a analistas, seguimiento de estados (GENERADA, EN_PRUEBA, APROBADA, RECHAZADA)
- ✅ **Sistema de pruebas**: Los analistas pueden crear pruebas asociadas a ideas y registrar resultados
- ✅ **Gestión de resultados de pruebas**: Registro detallado de resultados con estados y observaciones
- ✅ **Notificaciones**: Sistema de notificaciones cuando las ideas cambian de estado
- ✅ **Integración con OpenAI**: Servicio de IA para generar sugerencias de formulación basadas en productos existentes

**Funcionalidades Pendientes:**

- ⏳ Módulo Dashboard con KPIs y métricas en tiempo real
- ⏳ Integración con APIs moleculares (PubChem, ChEMBL, DrugBank, ZINC) para investigación
- ⏳ Módulo de Producción (órdenes de lote, dispensación digital)
- ⏳ Módulo de Aprobación/QA completo (firma digital, liberación de productos)
- ⏳ Módulo de Trazabilidad completo (trazabilidad hacia atrás/adelante)
- ⏳ Módulo de Base de Conocimiento (SOPs, guías, farmacopeas)

---

## 9. Usuarios – Roles

### 8.1 Analista de Laboratorio

**Descripción:**

El Analista es responsable de recibir las ideas generadas por el SupervisorQA mediante IA, desarrollarlas en el laboratorio, realizar las pruebas necesarias y determinar si la idea es viable o debe ser rechazada. Trabaja con las ideas asignadas y registra todos los resultados de las pruebas realizadas.

**Permisos:**

- Visualización de ideas asignadas por el SupervisorQA
- Desarrollo y prueba de ideas asignadas
- Creación de pruebas asociadas a ideas
- Registro de resultados de pruebas
- Aceptación o rechazo de ideas después de las pruebas
- Lectura de información de productos y sus formulaciones (BOM)
- Consulta de materiales disponibles en inventario
- Visualización de dashboard con sus actividades

**Módulos accesibles:**

- Ideas/Research (solo ideas asignadas)
- Pruebas/Control de Calidad (LIMS) - creación y gestión de pruebas
- Dashboard (vista personalizada)
- Inventario (materias primas - solo lectura)
- Productos (solo lectura de formulaciones)

**Flujo de Trabajo:**

1. Recibe notificación de nueva idea asignada por SupervisorQA
2. Revisa la idea y la información del producto base
3. Desarrolla la fórmula en el laboratorio
4. Crea pruebas asociadas a la idea
5. Registra resultados de las pruebas
6. Acepta o rechaza la idea según los resultados
7. El sistema notifica al SupervisorQA del resultado

**Restricciones:**

- No puede generar ideas mediante IA (solo SupervisorQA)
- No puede aprobar ideas para producción (solo SupervisorQA)
- No puede gestionar usuarios
- No puede acceder a configuración del sistema
- Solo puede trabajar con ideas que le han sido asignadas

### 8.2 Supervisor

**Descripción:**

Supervisor de procesos que apoya en la gestión de materias primas, recepción de materiales, y supervisión de procesos de calidad. Puede visualizar el estado de las ideas y pruebas pero no tiene autoridad para generar ideas mediante IA ni aprobar para producción.

**Permisos:**

- Supervisión de procesos de calidad
- Gestión de materias primas y recepción
- Ingreso de datos de proveedores y lotes
- Gestión de trazabilidad de materias primas
- Visualización de ideas y pruebas (solo lectura)
- Visualización de métricas de calidad
- Lectura de productos y formulaciones

**Módulos accesibles:**

- Dashboard (acceso completo)
- Ideas/Research (solo lectura)
- Formulación (solo lectura)
- Producción (gestión de materias primas)
- Pruebas/LIMS (visualización)
- Trazabilidad (acceso completo)
- Inventario (materias primas - acceso completo)

**Restricciones:**

- No puede generar ideas mediante IA (solo SupervisorQA)
- No puede aprobar ideas para producción (solo SupervisorQA)
- No puede gestionar usuarios
- No puede acceder a configuración del sistema

### 8.3 SupervisorQA (Supervisor de Calidad - Mayor Rango)

**Descripción:**

El SupervisorQA es el rol de mayor autoridad en el sistema. Es responsable de generar nuevas ideas de fórmulas mediante inteligencia artificial basándose en productos y formulaciones existentes. Recibe notificaciones cuando los analistas completan las pruebas y es quien determina si una idea es aceptada para producción o rechazada según el estado y los resultados.

**Permisos:**

- Generación de ideas mediante IA basadas en productos existentes
- Asignación de ideas a analistas para desarrollo y pruebas
- Visualización completa de todas las ideas (asignadas y no asignadas)
- Recepción de notificaciones cuando analistas completan pruebas
- Aprobación o rechazo final de ideas para producción
- Acceso completo a todas las fórmulas en la base de datos
- Visualización completa del estado del sistema
- Gestión de productos y sus formulaciones (BOM)
- Acceso a resultados de todas las pruebas

**Módulos accesibles:**

- Ideas/Research (acceso completo - generación y gestión)
- Pruebas/Control de Calidad (LIMS) - visualización completa
- Dashboard (acceso completo)
- Formulación (acceso completo a fórmulas reales)
- Productos (gestión completa)
- Inventario (acceso completo)
- Trazabilidad (acceso completo)

**Flujo de Trabajo:**

1. Selecciona un producto existente con su formulación
2. Define un objetivo o interés para la nueva fórmula
3. El sistema genera ideas mediante IA basándose en el producto y materiales disponibles
4. Revisa las ideas generadas
5. Asigna las ideas prometedoras a analistas
6. Recibe notificaciones cuando analistas completan pruebas
7. Revisa resultados de pruebas y estados
8. Aprueba ideas exitosas para producción o rechaza las que no cumplen criterios

**Restricciones:**

- No puede gestionar usuarios (solo Administrador)
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


---

## 10. Diagrama de Casos de Uso

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

---

## 11. Historias de Usuario

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



---

**Fin del Documento**

