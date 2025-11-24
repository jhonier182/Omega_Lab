# PT-ERS-01. Especificación de Requisitos (Plantilla)

**HISTORIAL DE REVISIÓN**

| Versión | Fecha Elaboración | Responsable Elaboración | Fecha Aprobación | Responsable Aprobación |
| --- | --- | --- | --- | --- |
| 1.0 | 2024-12-XX | Equipo de Desarrollo Proscience Lab |  |  |
|  |  |  |  |  |

**CAMBIOS RESPECTO A LA VERSIÓN ANTERIOR**

| **VERSIÓN** | **MODIFICACIÓN RESPECTO VERSIÓN ANTERIOR** |
| --- | --- |
| 1.0 | Creación del Documento. |
|  |  |

## Tabla de Contenido

1. [Introducción](#1-introducción)
   - 1.1 [Responsables e Involucrados](#11-responsables-e-involucrados)
   - 1.2 [Referencias (Bibliografía o web Grafía)](#12-referencias-bibliografía-o-web-grafía)
2. [Características del producto](#2-características-del-producto)
3. [Funciones del producto](#3-funciones-del-producto)
   - 3.1 [Módulo Dashboard](#31-módulo-dashboard)
   - 3.2 [Módulo Ideas/Research](#32-módulo-ideasresearch)
   - 3.3 [Módulo Formulación](#33-módulo-formulación)
   - 3.4 [Módulo IA/Simulación](#34-módulo-iasimulación)
   - 3.5 [Módulo Producción](#35-módulo-producción)
   - 3.6 [Módulo Pruebas/Control de Calidad (LIMS)](#36-módulo-pruebascontrol-de-calidad-lims)
   - 3.7 [Módulo Aprobación/QA](#37-módulo-aprobaciónqa)
   - 3.8 [Módulo Trazabilidad](#38-módulo-trazabilidad)
   - 3.9 [Módulo Base de Conocimiento](#39-módulo-base-de-conocimiento)
   - 3.10 [Módulo Configuración](#310-módulo-configuración)
4. [Características del usuario](#4-características-del-usuario)
   - 4.1 [Usuario](#41-usuario)
   - 4.2 [Analista](#42-analista)
   - 4.3 [Supervisor](#43-supervisor)
   - 4.4 [QA Manager](#44-qa-manager)
   - 4.5 [Administrador](#45-administrador)
5. [Especificación de requisitos](#5-especificación-de-requisitos)
   - 5.1 [Requisitos Funcionales](#51-requisitos-funcionales)
   - 5.2 [Requisitos No Funcionales](#52-requisitos-no-funcionales)
6. [Restricciones del software](#6-restricciones-del-software)
7. [Anexos](#7-anexos)

## 1. Introducción

### **Contextualización del Proyecto**

La industria de nutracéuticos y suplementos dietarios en Colombia ha experimentado un crecimiento significativo en los últimos años, impulsado por el aumento en la conciencia sobre salud y bienestar. Sin embargo, esta industria enfrenta desafíos regulatorios cada vez más estrictos, especialmente con las normativas de Buenas Prácticas de Manufactura (BPM) establecidas en el Decreto 3249 de 2006.

El INVIMA (Instituto Nacional de Vigilancia de Medicamentos y Alimentos) ha intensificado las inspecciones y auditorías, exigiendo mayor rigor en el cumplimiento de normativas, especialmente en aspectos relacionados con trazabilidad completa de lotes, integridad de datos, control de calidad, documentación de procesos y gestión de no conformidades.

Proscience Lab, como empresa comprometida con la calidad y el cumplimiento normativo, requiere un sistema que no solo cumpla con los requisitos regulatorios, sino que también mejore la eficiencia operativa y facilite la innovación mediante el uso de inteligencia artificial para la creación de nuevas fórmulas utilizando productos del inventario existente.

### **Propósito del Documento**

Este documento especifica los requisitos funcionales y no funcionales del sistema PLM/LIMS (Product Lifecycle Management / Laboratory Information Management System) para Proscience Lab. El propósito es:

- Definir de manera clara y completa todas las funcionalidades que debe tener el sistema
- Establecer los requisitos técnicos y de calidad que debe cumplir
- Documentar las características de los usuarios y sus permisos
- Especificar las restricciones y limitaciones del software
- Servir como base para el diseño, desarrollo, pruebas y validación del sistema
- Garantizar el cumplimiento con normativas regulatorias colombianas (Decreto 3249 de 2006, Ley 1581 de 2012)

Este documento está dirigido a desarrolladores, analistas de sistemas, gerentes de proyecto, usuarios finales y personal de validación y cumplimiento regulatorio.

### **Objetivo del Proyecto**

Desarrollar e implementar un sistema integral híbrido PLM/LIMS (Product Lifecycle Management / Laboratory Information Management System) diseñado específicamente para asistir en la creación de nuevas fórmulas de productos nutracéuticos y suplementos dietarios mediante inteligencia artificial, utilizando los productos y materias primas existentes en el inventario. El sistema permitirá cumplir con las Buenas Prácticas de Manufactura (BPM) establecidas en el Decreto 3249 de 2006 del Ministerio de Salud y Protección Social de Colombia, garantizando trazabilidad completa, integridad de datos, control de calidad y cumplimiento regulatorio, mientras facilita la innovación y desarrollo de nuevos productos de manera eficiente y segura.

### **Descripción General del Proyecto**

El sistema PLM/LIMS es una solución integral híbrida diseñada específicamente para asistir en la creación de nuevas fórmulas de productos nutracéuticos y suplementos dietarios mediante inteligencia artificial, utilizando los productos y materias primas existentes en el inventario.

El sistema permite cumplir con las Buenas Prácticas de Manufactura (BPM) establecidas en el Decreto 3249 de 2006 del Ministerio de Salud y Protección Social de Colombia, garantizando trazabilidad completa, integridad de datos, control de calidad y cumplimiento regulatorio, mientras facilita la innovación y desarrollo de nuevos productos de manera eficiente y segura.

**Características principales:**
- **Asistencia de IA en Formulación**: Sistema inteligente que ayuda a crear nuevas fórmulas utilizando productos y materias primas disponibles en el inventario existente
- **Gestión del Ciclo de Vida del Producto (PLM)**: Desde la investigación y formulación asistida por IA hasta la aprobación y liberación
- **Sistema de Información de Laboratorio (LIMS)**: Control de calidad, pruebas analíticas y gestión de muestras
- **Trazabilidad Completa**: Seguimiento de lotes desde materias primas hasta distribución
- **Integridad de Datos**: Registros inalterables con timestamps y firmas digitales
- **Control de Versiones**: Gestión de BOM (Bill of Materials) con historial de cambios
- **Cumplimiento Regulatorio**: Diseñado para cumplir con BPM y facilitar auditorías del INVIMA
- **Base de Conocimiento**: Repositorio centralizado de SOPs, guías y farmacopeas
- **Integración con APIs Moleculares**: Búsqueda en bases de datos científicas (PubChem, ChEMBL, DrugBank, ZINC) para investigación de ingredientes
- **Simulación e IA Avanzada**: Predicción de parámetros fisicoquímicos, análisis de compatibilidad de ingredientes y sugerencias inteligentes de formulación basadas en productos del inventario

### **Beneficios Esperados**

- Reducción del tiempo de desarrollo de productos en un 30-40%
- Reducción del 40-50% en tiempo de creación de nuevas fórmulas mediante asistencia de IA
- Eliminación de errores manuales en la gestión de formulaciones y BOM
- Cumplimiento total con normativas BPM y reducción de no conformidades
- Trazabilidad completa que facilita la gestión de retiros del mercado si es necesario
- Mejora en la eficiencia operativa mediante automatización de procesos
- Reducción de costos asociados a reprocesos y rechazos de lotes
- Facilita la preparación y ejecución de auditorías regulatorias
- Centralización de información que mejora la toma de decisiones
- Reducción de tiempo en búsqueda de información técnica y científica
- Mejora en la gestión de conocimiento organizacional
- Aumento del 30% en utilización de productos del inventario para nuevas formulaciones
- Reducción del 35% en tiempo de pruebas de nuevas fórmulas gracias a predicción previa de propiedades

### **Audiencia Objetivo**

- **Usuarios Primarios**: Personal de producción, analistas de control de calidad, supervisores, gerentes de QA, formuladores, investigadores
- **Usuarios Secundarios**: Gerencia general, personal de cumplimiento regulatorio, auditores internos y externos
- **Stakeholders Externos**: INVIMA (Instituto Nacional de Vigilancia de Medicamentos y Alimentos), clientes que requieren certificaciones

### **Alcance del Proyecto**

**Incluye:**
- Módulo de Dashboard con KPIs y métricas en tiempo real
- Módulo de Ideas/Research con integración a bases de datos moleculares
- Módulo de Formulación con gestión de BOM y control de versiones, incluyendo asistencia de IA
- Módulo de IA/Simulación para predicción de propiedades
- Módulo de Producción con órdenes de lote y dispensación digital
- Módulo de Pruebas/Control de Calidad (LIMS) con gestión de muestras
- Módulo de Aprobación/QA con firma digital y gestión de NC/CAPA
- Módulo de Trazabilidad de Lotes completo
- Módulo de Base de Conocimiento con control de versiones
- Módulo de Configuración de usuarios, roles y equipos
- Sistema de autenticación y autorización basado en roles
- API RESTful para integración con sistemas externos
- Interfaz web responsive y PWA (Progressive Web App)

**No incluye:**
- Integración con sistemas ERP existentes (fase futura)
- Módulo de facturación o contabilidad
- Sistema de gestión de inventario físico (solo trazabilidad)
- Integración con sistemas de distribución o logística externos
- Módulos de recursos humanos o nómina

---

### 1.1 Responsables e Involucrados

| **Nombre** | **Tipo (Responsable/ Involucrado)** | **Rol** | Cargo |
| --- | --- | --- | --- |
| Equipo de Desarrollo Proscience Lab | Responsable | Desarrollo y mantenimiento del sistema | Equipo Técnico |
| Gerencia de Calidad | Involucrado | Definición de requisitos regulatorios y validación | Gerencia |
| Personal de Producción | Involucrado | Usuarios finales y retroalimentación | Operaciones |
| Personal de Control de Calidad | Involucrado | Usuarios finales y validación de procesos LIMS | Calidad |
| QA Manager | Involucrado | Aprobación de procesos y liberación de producto | Calidad |
| INVIMA | Involucrado | Entidad regulatoria que auditará el sistema | Regulatorio |
|  |  |  |  |

### 1.2 Referencias (Bibliografía o web Grafía)

| **Nombre** | **Descripción** | **Link Referencia** |
| --- | --- | --- |
| **Ley 1581 de 2012** | Ley de Protección de Datos Personales en Colombia, que establece las normas para la recolección y manejo de datos personales. | [Ley 1581 de 2012](https://www.suin.gov.co/viewDocument.asp?id=30035507) |
| **Decreto 1377 de 2013** | Reglamento que complementa la Ley 1581, estableciendo procedimientos adicionales para la protección de datos personales. | [Decreto 1377 de 2013](https://www.suin.gov.co/viewDocument.asp?id=5198297) |
| **Decreto 3249 de 2006** | Decreto por el cual se establecen las Buenas Prácticas de Manufactura para empresas farmacéuticas y de productos para la salud | [Decreto 3249 de 2006](https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/DIJ/decreto-3249-de-2006.pdf) |
| **Resolución 1403 de 2007** | Por la cual se establece el reglamento técnico sobre los requisitos que deben cumplir los productos farmacéuticos para uso humano | [Resolución 1403 de 2007](https://www.invima.gov.co/documents/20143/0/Resolucion+1403+de+2007.pdf) |
| **FDA 21 CFR Part 11** | Electronic Records; Electronic Signatures - Guía para sistemas computarizados | [FDA 21 CFR Part 11](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/part-11-electronic-records-electronic-signatures-scope-and-application) |
| **ALCOA+ Principles** | Principios de integridad de datos (Attributable, Legible, Contemporaneous, Original, Accurate, Complete, Consistent, Enduring, Available) | [ALCOA+ Principles](https://www.fda.gov/drugs/guidance-compliance-regulatory-information/guidance-document-data-integrity-and-compliance-drug-cgmp-questions-and-answers) |
| **PubChem Database** | Base de datos de compuestos químicos del NIH | [PubChem](https://pubchem.ncbi.nlm.nih.gov/) |
| **ChEMBL Database** | Base de datos de bioactividad de moléculas pequeñas | [ChEMBL](https://www.ebi.ac.uk/chembl/) |
| **DrugBank Database** | Base de datos comprensiva de información sobre fármacos | [DrugBank](https://go.drugbank.com/) |
| **ZINC Database** | Base de datos de compuestos disponibles comercialmente | [ZINC](https://zinc.docking.org/) |
| **ISO 13485:2016** | Sistemas de gestión de la calidad para dispositivos médicos | [ISO 13485](https://www.iso.org/standard/59752.html) |
| **ICH Q7** | Buenas Prácticas de Manufactura para Ingredientes Farmacéuticos Activos | [ICH Q7](https://www.ich.org/page/quality-guidelines) |
| **Ley 1273 de 2009** | Ley de delitos informáticos. Establece sanciones penales para delitos relacionados con sistemas de información | [Ley 1273 de 2009](https://www.suin.gov.co/viewDocument.asp?id=1569997) |
| **Resolución 2658 de 2008** | Por la cual se establecen los requisitos sanitarios para el registro de suplementos dietarios | [Resolución 2658 de 2008](https://www.invima.gov.co/documents/20143/0/Resolucion+2658+de+2008.pdf) |

### **Referencias Consultadas Durante el Proceso de Levantamiento de Información**

- Documento PT-PP-01 Planteamiento del Problema
- Reuniones con Gerencia de Calidad de Proscience Lab
- Entrevistas con personal de producción y control de calidad
- Análisis de procesos actuales y documentación existente
- Revisión de normativas regulatorias colombianas

### **Conclusión**

Este documento establece la base para el desarrollo del sistema PLM/LIMS, definiendo claramente los requisitos que deben cumplirse para garantizar el éxito del proyecto y el cumplimiento de las normativas regulatorias aplicables.

---

## 2. Características del producto

---

El sistema PLM/LIMS para Proscience Lab es una solución integral que combina gestión del ciclo de vida del producto (PLM) con sistema de información de laboratorio (LIMS), diseñada específicamente para la industria de nutracéuticos y suplementos dietarios en Colombia.

### **Características Principales**

**Asistencia de IA en Formulación:**
- Sistema inteligente que ayuda a crear nuevas fórmulas utilizando productos y materias primas disponibles en el inventario existente
- Análisis automático de inventario disponible para identificar productos utilizables
- Sugerencias inteligentes basadas en compatibilidad, propiedades fisicoquímicas y mejores prácticas
- Predicción de propiedades de nuevas fórmulas antes de la producción

**Arquitectura Tecnológica:**
- **Frontend**: React 18 con Vite, Tailwind CSS, React Router
- **Backend**: Java Spring Boot 4.0.0 con Java 21, Spring Data JPA (Hibernate), Spring Security
- **Base de Datos**: MySQL 8.0+ con UTF8MB4
- **Interfaz**: Responsive design, PWA (Progressive Web App) con funcionalidad offline
- **API**: RESTful para integración con sistemas externos
- **Autenticación**: JWT (JSON Web Tokens) con Spring Security
- **ORM**: Spring Data JPA con Hibernate

**Seguridad y Cumplimiento:**
- Autenticación basada en tokens JWT
- Autorización basada en roles (RBAC)
- Encriptación de contraseñas con bcrypt
- Headers de seguridad HTTP (Helmet)
- Rate limiting para prevención de ataques
- Validación de inputs en todas las capas
- Principios ALCOA+ para integridad de datos
- Cumplimiento con Decreto 3249 de 2006 (BPM)
- Cumplimiento con Ley 1581 de 2012 (Protección de datos)

**Funcionalidades Clave:**
- Gestión completa del ciclo de vida del producto
- Control de calidad y gestión de muestras (LIMS)
- Trazabilidad completa de lotes
- Control de versiones de BOM y documentos
- Integración con bases de datos moleculares (PubChem, ChEMBL, DrugBank, ZINC)
- Base de conocimiento centralizada
- Gestión de No Conformidades y CAPA
- Firma digital para liberación de productos

**Características de Usabilidad:**
- Interfaz intuitiva y moderna
- Diseño responsive para desktop y móvil
- Funcionalidad offline básica (PWA)
- Búsqueda y filtrado avanzado
- Reportes y dashboards en tiempo real
- Notificaciones y alertas automáticas

### **Conclusión**

El sistema está diseñado para ser una solución completa, segura y escalable que cumple con todas las normativas regulatorias colombianas mientras facilita la innovación y mejora la eficiencia operativa mediante el uso de inteligencia artificial.

---

## 3. Funciones del producto

---

El sistema PLM/LIMS está organizado en 10 módulos principales que cubren todo el ciclo de vida del producto, desde la investigación hasta la distribución, con énfasis en la creación de nuevas fórmulas mediante asistencia de IA.

### **Módulos de Funciones del Producto:**

---

### 3.1 Módulo Dashboard

**Funciones principales:**
- Visualización de KPIs en tiempo real (lotes en producción, lotes pendientes, no conformidades activas)
- Métricas de producción y calidad
- Alertas y notificaciones importantes
- Accesos rápidos a módulos principales
- Gráficos y visualizaciones de tendencias
- Resumen de actividades recientes

**Características:**
- Actualización automática de datos
- Filtros por período de tiempo
- Exportación de reportes
- Personalización de widgets según rol de usuario

---

### 3.2 Módulo Ideas/Research

**Funciones principales:**
- Búsqueda integrada en bases de datos moleculares:
  - PubChem (compuestos químicos del NIH)
  - ChEMBL (bioactividad de moléculas pequeñas)
  - DrugBank (información sobre fármacos)
  - ZINC (compuestos disponibles comercialmente)
- Guardado de resultados de investigación
- Historial de búsquedas realizadas
- Integración con módulo de formulación para usar ingredientes encontrados
- Análisis de propiedades de compuestos
- Comparación de ingredientes

**Características:**
- Búsqueda por nombre, CAS, SMILES, fórmula molecular
- Visualización de estructuras moleculares
- Exportación de datos de investigación
- Marcado de favoritos

---

### 3.3 Módulo Formulación

**Funciones principales:**
- **Creación Inteligente de Nuevas Fórmulas**: Sistema de IA que sugiere combinaciones de productos y materias primas existentes en el inventario para crear nuevas fórmulas
- **Análisis de Inventario Disponible**: Identificación automática de productos y materias primas disponibles para uso en nuevas formulaciones
- **Sugerencias de Formulación**: Recomendaciones inteligentes basadas en compatibilidad, propiedades fisicoquímicas y mejores prácticas
- Creación y gestión de BOM (Bill of Materials) con control de versiones
- Justificación técnica de formulaciones
- Historial completo de cambios con trazabilidad de usuarios
- Validación de proporciones y cálculos
- Comparación de versiones de formulaciones
- Exportación de formulaciones y BOM

**Características:**
- Interfaz intuitiva para agregar ingredientes
- Cálculo automático de porcentajes y cantidades
- Validación de compatibilidad de ingredientes
- Integración con módulo de IA para predicción de propiedades
- Control de versiones con historial completo
- Firma digital para aprobación de formulaciones

---

### 3.4 Módulo IA/Simulación

**Funciones principales:**
- **Asistencia en Creación de Fórmulas**: IA que analiza productos del inventario y sugiere nuevas combinaciones y proporciones
- **Predicción de Propiedades**: Predicción de parámetros fisicoquímicos de nuevas fórmulas antes de la producción
- **Análisis de Compatibilidad**: Evaluación automática de compatibilidad entre ingredientes del inventario
- **Optimización de Formulaciones**: Sugerencias para mejorar eficiencia, costo o propiedades de las fórmulas
- Extracción automática de datos de documentos científicos
- Análisis de tendencias y patrones en formulaciones exitosas
- Simulación de propiedades del producto final
- Análisis de estabilidad

**Características:**
- Modelos de machine learning entrenados con datos históricos
- Integración con APIs de predicción molecular
- Visualización de resultados de simulación
- Reportes de análisis de compatibilidad
- Recomendaciones personalizadas según objetivos

---

### 3.5 Módulo Producción

**Funciones principales:**
- Gestión de órdenes de lote
- Dispensación digital de materiales
- Line clearance (limpieza y liberación de líneas)
- Control de procesos de producción
- Seguimiento de estado de lotes en tiempo real
- Registro de actividades de producción
- Gestión de desviaciones en producción
- Integración con módulo de trazabilidad

**Características:**
- Flujo de trabajo configurable
- Validación de materiales antes de dispensación
- Registro de timestamps automáticos
- Firma digital para aprobaciones
- Alertas de desviaciones

---

### 3.6 Módulo Pruebas/Control de Calidad (LIMS)

**Funciones principales:**
- Gestión de muestras (registro, etiquetado, seguimiento)
- Registro de pruebas analíticas
- Trazabilidad completa de muestras
- Gestión de resultados OOS (Out of Specification)
- Control de calibración de equipos
- Alertas automáticas para resultados fuera de especificación
- Gestión de métodos analíticos
- Reportes de calidad

**Características:**
- Asignación automática de números de muestra
- Vinculación de muestras con lotes
- Control de cadena de custodia
- Validación de resultados
- Integración con equipos de laboratorio (futuro)
- Historial completo de pruebas

---

### 3.7 Módulo Aprobación/QA

**Funciones principales:**
- Liberación de producto con firma digital
- Gestión de No Conformidades (NC)
- Gestión de Acciones Correctivas y Preventivas (CAPA)
- Control de cambios en documentos y procesos
- Validaciones de procesos
- Aprobación de lotes para distribución
- Gestión de desviaciones
- Reportes de cumplimiento

**Características:**
- Flujo de aprobación configurable
- Firma digital con timestamp
- Registros inalterables una vez firmados
- Trazabilidad de aprobaciones
- Alertas de vencimiento de CAPA
- Dashboard de no conformidades

---

### 3.8 Módulo Trazabilidad

**Funciones principales:**
- Línea de tiempo completa de lotes desde materias primas hasta distribución
- Trazabilidad hacia atrás (backward): rastreo desde producto final hasta materias primas
- Trazabilidad hacia adelante (forward): rastreo desde materias primas hasta productos distribuidos
- Gestión de retiros del mercado
- Visualización de cadena de suministro
- Búsqueda de lotes por múltiples criterios
- Reportes de trazabilidad

**Características:**
- Visualización interactiva de línea de tiempo
- Filtros avanzados de búsqueda
- Exportación de reportes de trazabilidad
- Alertas de lotes relacionados en caso de problemas
- Integración con todos los módulos del sistema

---

### 3.9 Módulo Base de Conocimiento

**Funciones principales:**
- Repositorio centralizado de SOPs (Procedimientos Operativos Estándar)
- Gestión de guías técnicas
- Gestión de farmacopeas
- Control de versiones de documentos
- Búsqueda y filtrado de documentos
- Categorización y etiquetado
- Control de acceso por rol
- Notificaciones de actualizaciones

**Características:**
- Visualizador de documentos integrado
- Búsqueda full-text
- Historial de versiones
- Comparación de versiones
- Descarga de documentos
- Vinculación con procesos y formulaciones

---

### 3.10 Módulo Configuración

**Funciones principales:**
- Gestión de usuarios (crear, editar, desactivar)
- Gestión de roles y permisos
- Configuración de equipos de laboratorio
- Configuración de validaciones del sistema
- Parámetros del sistema
- Configuración de alertas y notificaciones
- Gestión de catálogos (tipos de productos, unidades de medida, etc.)
- Configuración de flujos de trabajo

**Características:**
- Interfaz administrativa completa
- Auditoría de cambios en configuración
- Validación de configuraciones
- Exportación/importación de configuraciones
- Acceso restringido a administradores

---

## 4 Características del usuario


### **Tipos de Usuarios:**

El sistema define 5 tipos de usuarios con diferentes niveles de acceso y permisos, basados en roles organizacionales:

---

### 4.1 Usuario

**Descripción:**
Personal de producción básico que realiza actividades operativas rutinarias.

**Permisos:**
- Lectura de información de productos y lotes
- Registro de actividades básicas de producción
- Visualización de dashboard
- Consulta de trazabilidad (solo lectura)
- Acceso a base de conocimiento (solo lectura)
- Gestión de materiales y categorías

**Módulos accesibles:**
- Dashboard (lectura)
- Producción (registro de actividades básicas)
- Trazabilidad (solo lectura)
- Base de Conocimiento (solo lectura)
- Inventario (materias primas)

**Restricciones:**
- No puede crear o modificar formulaciones
- No puede aprobar lotes
- No puede gestionar usuarios
- No puede acceder a configuración del sistema

---

### 4.2 Analista de Laboratorio

**Descripción:**
Auxiliar de I+D que recibe órdenes de formulación. No tiene acceso a base de datos con fórmulas reales. Solo cumple requerimientos especificados en órdenes, desarrollo de la misma e ingreso del análisis sensorial.

**Permisos:**
- Registro de pruebas analíticas
- Gestión de muestras
- Registro de resultados OOS
- Lectura de formulaciones (solo órdenes asignadas)
- Consulta de trazabilidad
- Acceso a investigación (Ideas/Research)
- Gestión de materiales y categorías

**Módulos accesibles:**
- Dashboard
- Ideas/Research
- Formulación (solo órdenes asignadas)
- Pruebas/LIMS (acceso completo)
- Trazabilidad
- Base de Conocimiento
- Inventario (materias primas)

**Restricciones:**
- No puede crear o modificar formulaciones reales en la base de datos
- No puede aprobar lotes
- No puede gestionar usuarios
- No puede acceder a configuración del sistema

---

### 4.3 Supervisor de Calidad

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

---

### 4.4 Supervisor QA

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

---

### 4.5 Administrador

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

## **5. Especificación de requisitos**

### **5.1 Requisitos Funcionales**

### **5.1.1 Clasificación de Requisitos Funcionales**

| **FUNCIONALIDAD** | **TIPO (Esencial, Ideal, Opcional)** | **ESTADO** |
| --- | --- | --- |
| RF01 - Registro de usuarios | Esencial | ✅ Implementado |
| RF02 - Inicio de sesión | Esencial | ✅ Implementado |
| RF03 - Gestión de sesión con JWT | Esencial | ✅ Implementado |
| RF04 - Control de acceso basado en roles | Esencial | ✅ Implementado |
| RF05 - Recuperación de contraseña | Ideal |
| RF06 - Visualización de KPIs en tiempo real | Esencial |
| RF07 - Visualización de lotes pendientes | Esencial |
| RF08 - Visualización de no conformidades activas | Esencial |
| RF09 - Alertas y notificaciones | Ideal |
| RF10 - Búsqueda en bases de datos moleculares | Esencial |
| RF11 - Guardado de resultados de investigación | Ideal |
| RF12 - Historial de búsquedas | Ideal |
| RF13 - Creación de nuevas fórmulas | Esencial | ✅ Implementado |
| RF14 - Asistencia de IA para sugerir combinaciones de productos del inventario | Esencial | ⏳ Pendiente |
| RF15 - Análisis de inventario disponible | Esencial | ✅ Implementado |
| RF16 - Gestión de BOM con control de versiones | Esencial | ✅ Implementado |
| RF17 - Justificación técnica de formulaciones | Esencial |
| RF18 - Historial de cambios con trazabilidad | Esencial |
| RF19 - Validación de proporciones | Esencial |
| RF20 - Predicción de propiedades fisicoquímicas | Esencial |
| RF21 - Análisis de compatibilidad de ingredientes | Esencial |
| RF22 - Optimización de formulaciones | Ideal |
| RF23 - Extracción de datos de documentos científicos | Ideal |
| RF24 - Análisis de tendencias | Opcional |
| RF25 - Creación de órdenes de lote | Esencial |
| RF26 - Dispensación digital de materiales | Esencial |
| RF27 - Line clearance | Esencial |
| RF28 - Seguimiento de estado de lotes | Esencial |
| RF29 - Registro de muestras | Esencial |
| RF30 - Registro de pruebas analíticas | Esencial |
| RF31 - Gestión de resultados OOS | Esencial |
| RF32 - Control de calibración de equipos | Esencial |
| RF33 - Alertas automáticas para OOS | Ideal |
| RF34 - Liberación de producto con firma digital | Esencial |
| RF35 - Gestión de No Conformidades | Esencial |
| RF36 - Gestión de CAPA | Esencial |
| RF37 - Control de cambios | Esencial |
| RF38 - Trazabilidad completa de lotes | Esencial |
| RF39 - Trazabilidad hacia atrás | Esencial |
| RF40 - Trazabilidad hacia adelante | Esencial |
| RF41 - Gestión de retiros del mercado | Ideal |
| RF42 - Gestión de SOPs | Esencial |
| RF43 - Control de versiones de documentos | Esencial |
| RF44 - Búsqueda de documentos | Esencial |
| RF45 - Gestión de usuarios | Esencial |
| RF46 - Gestión de roles y permisos | Esencial |
| RF47 - Configuración de equipos | Esencial |

---

### **RF01 - Registro de Usuarios**

| **ID del requerimiento** | RF01 |
| --- | --- |
| **Nombre del requerimiento** | Registro de Usuarios |
| **Descripción** | El sistema debe permitir el registro de nuevos usuarios con información básica (email, contraseña, nombre, rol). La contraseña debe ser encriptada antes de almacenarse. Solo usuarios con rol de administrador pueden registrar nuevos usuarios. |
| **Prioridad** | Esencial |
| **Módulo** | Autenticación y Autorización |
| **Casos de uso** | - Administrador crea nuevo usuario<br>- Validación de email único<br>- Encriptación de contraseña |
| **Criterios de aceptación** | - El sistema valida que el email sea único<br>- La contraseña se encripta con bcrypt antes de almacenarse<br>- Se asigna un rol válido (administrador, supervisor_qa, supervisor_calidad, analista_laboratorio)<br>- Se registra timestamp de creación<br>- Solo administradores pueden crear usuarios |

---

### **RF02 - Inicio de Sesión**

| **ID del requerimiento** | RF02 |
| --- | --- |
| **Nombre del requerimiento** | Inicio de Sesión |
| **Descripción** | El sistema debe permitir a los usuarios autenticarse mediante email y contraseña. Debe validar las credenciales y generar un token JWT para la sesión. |
| **Prioridad** | Esencial |
| **Módulo** | Autenticación y Autorización |
| **Casos de uso** | - Usuario inicia sesión con email y contraseña<br>- Validación de credenciales<br>- Generación de token JWT |
| **Criterios de aceptación** | - El sistema valida email y contraseña<br>- Se genera token JWT con información del usuario y rol<br>- El token tiene tiempo de expiración configurable<br>- Se registra timestamp de último acceso<br>- Usuarios inactivos no pueden iniciar sesión |

---

### **RF03 - Gestión de Sesión con JWT**

| **ID del requerimiento** | RF03 |
| --- | --- |
| **Nombre del requerimiento** | Gestión de Sesión con JWT |
| **Descripción** | El sistema debe gestionar sesiones de usuario mediante tokens JWT. El token debe incluir información del usuario y rol, y debe validarse en cada solicitud protegida. |
| **Prioridad** | Esencial |
| **Módulo** | Autenticación y Autorización |
| **Casos de uso** | - Validación de token en solicitudes<br>- Renovación de sesión<br>- Cierre de sesión |
| **Criterios de aceptación** | - El token JWT se valida en cada solicitud protegida<br>- El token incluye información de usuario y rol<br>- El token tiene tiempo de expiración<br>- Se puede renovar el token antes de expirar<br>- El cierre de sesión invalida el token |

---

### **RF04 - Control de Acceso Basado en Roles**

| **ID del requerimiento** | RF04 |
| --- | --- |
| **Nombre del requerimiento** | Control de Acceso Basado en Roles |
| **Descripción** | El sistema debe implementar control de acceso basado en roles (RBAC). Cada usuario tiene un rol que determina qué módulos y funcionalidades puede acceder. |
| **Prioridad** | Esencial |
| **Módulo** | Autenticación y Autorización |
| **Casos de uso** | - Usuario intenta acceder a módulo restringido<br>- Validación de permisos por rol<br>- Bloqueo de acceso no autorizado |
| **Criterios de aceptación** | - El sistema valida el rol del usuario antes de permitir acceso<br>- Los roles definidos son: administrador, supervisor_qa, supervisor_calidad, analista_laboratorio<br>- Cada rol tiene permisos específicos definidos<br>- Se registra intento de acceso no autorizado<br>- Se muestra mensaje apropiado al usuario |

---

### **RF05 - Recuperación de Contraseña**

| **ID del requerimiento** | RF05 |
| --- | --- |
| **Nombre del requerimiento** | Recuperación de Contraseña |
| **Descripción** | El sistema debe permitir a los usuarios recuperar su contraseña mediante un proceso seguro que incluya envío de enlace de restablecimiento por email. |
| **Prioridad** | Ideal |
| **Módulo** | Autenticación y Autorización |
| **Casos de uso** | - Usuario solicita recuperación de contraseña<br>- Sistema envía email con enlace<br>- Usuario restablece contraseña |
| **Criterios de aceptación** | - El usuario puede solicitar recuperación ingresando su email<br>- Se envía email con enlace único y temporal<br>- El enlace expira después de un tiempo configurable (ej: 1 hora)<br>- El usuario puede establecer nueva contraseña<br>- Se registra el cambio en auditoría |

---

### **RF06 - Visualización de KPIs en Tiempo Real**

| **ID del requerimiento** | RF06 |
| --- | --- |
| **Nombre del requerimiento** | Visualización de KPIs en Tiempo Real |
| **Descripción** | El sistema debe mostrar KPIs (Indicadores Clave de Rendimiento) en tiempo real en el dashboard, incluyendo métricas de producción, calidad y cumplimiento. |
| **Prioridad** | Esencial |
| **Módulo** | Dashboard |
| **Casos de uso** | - Usuario accede al dashboard<br>- Sistema muestra KPIs actualizados<br>- Usuario puede filtrar por período |
| **Criterios de aceptación** | - Los KPIs se actualizan automáticamente cada X minutos<br>- Incluye métricas: lotes en producción, lotes pendientes, no conformidades activas<br>- Se pueden filtrar por período de tiempo<br>- Los datos se muestran en formato visual (gráficos, tablas)<br>- El tiempo de carga es menor a 3 segundos |

---

### **RF07 - Visualización de Lotes Pendientes**

| **ID del requerimiento** | RF07 |
| --- | --- |
| **Nombre del requerimiento** | Visualización de Lotes Pendientes |
| **Descripción** | El sistema debe mostrar una lista de lotes pendientes de procesamiento, aprobación o acción, con información relevante y filtros. |
| **Prioridad** | Esencial |
| **Módulo** | Dashboard |
| **Casos de uso** | - Usuario consulta lotes pendientes<br>- Sistema muestra lista filtrada<br>- Usuario puede acceder al detalle del lote |
| **Criterios de aceptación** | - Se muestran lotes pendientes según el rol del usuario<br>- Incluye información: número de lote, estado, fecha, responsable<br>- Se pueden filtrar por estado, fecha, responsable<br>- Se puede acceder al detalle del lote desde la lista<br>- Se actualiza en tiempo real |

---

### **RF08 - Visualización de No Conformidades Activas**

| **ID del requerimiento** | RF08 |
| --- | --- |
| **Nombre del requerimiento** | Visualización de No Conformidades Activas |
| **Descripción** | El sistema debe mostrar las no conformidades activas en el dashboard, con información de prioridad, estado y responsable. |
| **Prioridad** | Esencial |
| **Módulo** | Dashboard |
| **Casos de uso** | - Usuario consulta no conformidades activas<br>- Sistema muestra lista con prioridades<br>- Usuario puede acceder al detalle |
| **Criterios de aceptación** | - Se muestran todas las NC activas<br>- Se indican prioridades (alta, media, baja)<br>- Se muestra fecha de vencimiento de CAPA asociada<br>- Se puede filtrar por prioridad, estado, responsable<br>- Alertas visuales para NC críticas |

---

### **RF09 - Alertas y Notificaciones**

| **ID del requerimiento** | RF09 |
| --- | --- |
| **Nombre del requerimiento** | Alertas y Notificaciones |
| **Descripción** | El sistema debe enviar alertas y notificaciones a los usuarios sobre eventos importantes como resultados OOS, vencimientos de CAPA, lotes pendientes de aprobación, etc. |
| **Prioridad** | Ideal |
| **Módulo** | Dashboard |
| **Casos de uso** | - Sistema detecta evento importante<br>- Sistema genera notificación<br>- Usuario recibe notificación |
| **Criterios de aceptación** | - Las notificaciones se muestran en el dashboard<br>- Se pueden configurar preferencias de notificación<br>- Se pueden marcar como leídas<br>- Se pueden filtrar por tipo de notificación<br>- Se envían notificaciones por email para eventos críticos |

---

### **RF10 - Búsqueda en Bases de Datos Moleculares**

| **ID del requerimiento** | RF10 |
| --- | --- |
| **Nombre del requerimiento** | Búsqueda en Bases de Datos Moleculares |
| **Descripción** | El sistema debe permitir buscar información de compuestos químicos en bases de datos moleculares externas (PubChem, ChEMBL, DrugBank, ZINC) mediante integración con sus APIs. |
| **Prioridad** | Esencial |
| **Módulo** | Ideas/Research |
| **Casos de uso** | - Usuario busca compuesto por nombre o CAS<br>- Sistema consulta APIs externas<br>- Sistema muestra resultados |
| **Criterios de aceptación** | - Se puede buscar por nombre, CAS, SMILES, fórmula molecular<br>- Se integra con al menos 2 bases de datos moleculares<br>- Los resultados incluyen propiedades fisicoquímicas<br>- Se pueden guardar resultados para uso posterior<br>- El tiempo de búsqueda es menor a 10 segundos |

---

### **RF11 - Guardado de Resultados de Investigación**

| **ID del requerimiento** | RF11 |
| --- | --- |
| **Nombre del requerimiento** | Guardado de Resultados de Investigación |
| **Descripción** | El sistema debe permitir guardar resultados de búsquedas en bases de datos moleculares para referencia futura y uso en formulaciones. |
| **Prioridad** | Ideal |
| **Módulo** | Ideas/Research |
| **Casos de uso** | - Usuario encuentra compuesto de interés<br>- Usuario guarda resultado<br>- Usuario puede acceder a resultados guardados |
| **Criterios de aceptación** | - Se pueden guardar resultados con notas y etiquetas<br>- Se pueden organizar en carpetas o categorías<br>- Se puede buscar en resultados guardados<br>- Se pueden exportar resultados guardados<br>- Se puede vincular resultado guardado con formulación |

---

### **RF12 - Historial de Búsquedas**

| **ID del requerimiento** | RF12 |
| --- | --- |
| **Nombre del requerimiento** | Historial de Búsquedas |
| **Descripción** | El sistema debe mantener un historial de todas las búsquedas realizadas por cada usuario, permitiendo acceder a búsquedas anteriores. |
| **Prioridad** | Ideal |
| **Módulo** | Ideas/Research |
| **Casos de uso** | - Usuario realiza búsqueda<br>- Sistema guarda búsqueda en historial<br>- Usuario consulta historial |
| **Criterios de aceptación** | - Se guarda cada búsqueda con timestamp<br>- Se puede filtrar historial por fecha, término de búsqueda<br>- Se puede repetir búsqueda desde historial<br>- El historial se mantiene por al menos 6 meses<br>- Se puede limpiar historial manualmente |

---

### **RF13 - Creación de Nuevas Fórmulas**

| **ID del requerimiento** | RF13 |
| --- | --- |
| **Nombre del requerimiento** | Creación de Nuevas Fórmulas |
| **Descripción** | El sistema debe permitir crear nuevas fórmulas de productos, agregando ingredientes del inventario, definiendo proporciones y guardando la información con control de versiones. |
| **Prioridad** | Esencial |
| **Módulo** | Formulación |
| **Casos de uso** | - Usuario crea nueva fórmula<br>- Usuario agrega ingredientes<br>- Usuario define proporciones<br>- Usuario guarda fórmula |
| **Criterios de aceptación** | - Se puede crear fórmula con nombre y descripción<br>- Se pueden agregar ingredientes del inventario<br>- Se pueden definir proporciones en porcentaje o cantidad<br>- Se valida que las proporciones sumen 100%<br>- Se guarda con control de versiones<br>- Se puede duplicar fórmula existente |

---

### **RF14 - Asistencia de IA para Sugerir Combinaciones de Productos del Inventario**

| **ID del requerimiento** | RF14 |
| --- | --- |
| **Nombre del requerimiento** | Asistencia de IA para Sugerir Combinaciones de Productos del Inventario |
| **Descripción** | El sistema debe utilizar inteligencia artificial para analizar los productos y materias primas disponibles en el inventario y sugerir combinaciones inteligentes para crear nuevas fórmulas. Las sugerencias deben basarse en compatibilidad, propiedades fisicoquímicas y mejores prácticas. |
| **Prioridad** | Esencial |
| **Módulo** | Formulación |
| **Casos de uso** | - Usuario solicita sugerencias de formulación<br>- IA analiza inventario disponible<br>- IA genera sugerencias de combinaciones<br>- Usuario selecciona sugerencia para crear fórmula |
| **Criterios de aceptación** | - El sistema analiza todos los productos disponibles en inventario<br>- Genera al menos 3 sugerencias de combinaciones<br>- Cada sugerencia incluye proporciones recomendadas<br>- Las sugerencias consideran compatibilidad de ingredientes<br>- Las sugerencias incluyen justificación técnica<br>- El usuario puede aceptar, modificar o rechazar sugerencias |

---

### **RF15 - Análisis de Inventario Disponible**

| **ID del requerimiento** | RF15 |
| --- | --- |
| **Nombre del requerimiento** | Análisis de Inventario Disponible |
| **Descripción** | El sistema debe analizar el inventario disponible y mostrar qué productos y materias primas están disponibles para uso en nuevas formulaciones, incluyendo cantidades y estados. |
| **Prioridad** | Esencial |
| **Módulo** | Formulación |
| **Casos de uso** | - Usuario solicita análisis de inventario<br>- Sistema analiza productos disponibles<br>- Sistema muestra lista de productos utilizables |
| **Criterios de aceptación** | - Se muestran todos los productos disponibles en inventario<br>- Se indica cantidad disponible de cada producto<br>- Se muestra estado del producto (activo, inactivo, en cuarentena)<br>- Se pueden filtrar por tipo de producto<br>- Se puede buscar por nombre o código<br>- Se muestra fecha de vencimiento si aplica |

---

### **RF16 - Gestión de BOM con Control de Versiones**

| **ID del requerimiento** | RF16 |
| --- | --- |
| **Nombre del requerimiento** | Gestión de BOM con Control de Versiones |
| **Descripción** | El sistema debe permitir crear y gestionar BOM (Bill of Materials) con control de versiones, manteniendo historial completo de cambios y permitiendo comparar versiones. |
| **Prioridad** | Esencial |
| **Módulo** | Formulación |
| **Casos de uso** | - Usuario crea BOM para producto<br>- Usuario modifica BOM<br>- Sistema crea nueva versión<br>- Usuario compara versiones |
| **Criterios de aceptación** | - Cada cambio crea una nueva versión del BOM<br>- Se mantiene historial completo de versiones<br>- Se puede comparar dos versiones<br>- Se puede restaurar versión anterior<br>- Cada versión tiene número, fecha, usuario que modificó<br>- Se puede ver diferencia entre versiones |

---

### **RF17 - Justificación Técnica de Formulaciones**

| **ID del requerimiento** | RF17 |
| --- | --- |
| **Nombre del requerimiento** | Justificación Técnica de Formulaciones |
| **Descripción** | El sistema debe permitir agregar justificación técnica a las formulaciones, explicando la razón de la selección de ingredientes y proporciones. |
| **Prioridad** | Esencial |
| **Módulo** | Formulación |
| **Casos de uso** | - Usuario crea o modifica fórmula<br>- Usuario agrega justificación técnica<br>- Usuario guarda con justificación |
| **Criterios de aceptación** | - Se puede agregar justificación técnica a cada formulación<br>- La justificación es obligatoria para aprobación<br>- Se puede adjuntar documentos de soporte<br>- Se puede editar justificación antes de aprobación<br>- Una vez aprobada, la justificación no se puede modificar |

---

### **RF18 - Historial de Cambios con Trazabilidad**

| **ID del requerimiento** | RF18 |
| --- | --- |
| **Nombre del requerimiento** | Historial de Cambios con Trazabilidad |
| **Descripción** | El sistema debe mantener un historial completo de todos los cambios realizados en formulaciones y BOM, incluyendo quién hizo el cambio, cuándo y qué se modificó. |
| **Prioridad** | Esencial |
| **Módulo** | Formulación |
| **Casos de uso** | - Usuario modifica formulación<br>- Sistema registra cambio<br>- Usuario consulta historial |
| **Criterios de aceptación** | - Se registra cada cambio con: usuario, timestamp, descripción del cambio<br>- Se puede ver historial completo de cambios<br>- Se puede filtrar por usuario, fecha, tipo de cambio<br>- Se puede exportar historial<br>- Los cambios son inalterables una vez registrados |

---

### **RF19 - Validación de Proporciones**

| **ID del requerimiento** | RF19 |
| --- | --- |
| **Nombre del requerimiento** | Validación de Proporciones |
| **Descripción** | El sistema debe validar que las proporciones de ingredientes en una fórmula sumen correctamente (100% para porcentajes) y alertar sobre errores o inconsistencias. |
| **Prioridad** | Esencial |
| **Módulo** | Formulación |
| **Casos de uso** | - Usuario ingresa proporciones<br>- Sistema valida suma<br>- Sistema alerta si hay error |
| **Criterios de aceptación** | - Si se usan porcentajes, la suma debe ser 100%<br>- Si se usan cantidades, se valida que sean positivas<br>- Se alerta si la suma no es correcta<br>- Se previene guardar fórmula con proporciones inválidas<br>- Se muestra mensaje claro de error |

---

### **RF20 - Predicción de Propiedades Fisicoquímicas**

| **ID del requerimiento** | RF20 |
| --- | --- |
| **Nombre del requerimiento** | Predicción de Propiedades Fisicoquímicas |
| **Descripción** | El sistema debe poder predecir propiedades fisicoquímicas de nuevas fórmulas antes de la producción, utilizando modelos de IA y datos históricos. |
| **Prioridad** | Esencial |
| **Módulo** | IA/Simulación |
| **Casos de uso** | - Usuario ingresa nueva fórmula<br>- Sistema predice propiedades<br>- Usuario revisa predicciones antes de producir |
| **Criterios de aceptación** | - El sistema predice al menos: pH, viscosidad, densidad, estabilidad<br>- Las predicciones tienen un nivel de confianza asociado<br>- Se muestran comparaciones con fórmulas similares históricas<br>- Las predicciones se guardan con la formulación |

---

### **RF21 - Análisis de Compatibilidad de Ingredientes**

| **ID del requerimiento** | RF21 |
| --- | --- |
| **Nombre del requerimiento** | Análisis de Compatibilidad de Ingredientes |
| **Descripción** | El sistema debe analizar la compatibilidad entre ingredientes de una fórmula, identificando posibles incompatibilidades o interacciones negativas. |
| **Prioridad** | Esencial |
| **Módulo** | IA/Simulación |
| **Casos de uso** | - Usuario crea fórmula con múltiples ingredientes<br>- Sistema analiza compatibilidad<br>- Sistema muestra alertas de incompatibilidad |
| **Criterios de aceptación** | - Se analiza compatibilidad entre todos los ingredientes<br>- Se identifican incompatibilidades conocidas<br>- Se muestran alertas de incompatibilidad<br>- Se sugiere alternativas si hay incompatibilidad<br>- El análisis se realiza en tiempo real mientras se crea la fórmula |

---

### **RF22 - Optimización de Formulaciones**

| **ID del requerimiento** | RF22 |
| --- | --- |
| **Nombre del requerimiento** | Optimización de Formulaciones |
| **Descripción** | El sistema debe sugerir optimizaciones a formulaciones existentes para mejorar eficiencia, reducir costos o mejorar propiedades, utilizando algoritmos de IA. |
| **Prioridad** | Ideal |
| **Módulo** | IA/Simulación |
| **Casos de uso** | - Usuario solicita optimización de fórmula<br>- Sistema analiza y sugiere mejoras<br>- Usuario revisa sugerencias |
| **Criterios de aceptación** | - Se pueden optimizar por: costo, eficiencia, propiedades<br>- Se generan al menos 3 opciones de optimización<br>- Cada opción incluye justificación<br>- Se muestra comparación con fórmula original<br>- El usuario puede aceptar, modificar o rechazar sugerencias |

---

### **RF23 - Extracción de Datos de Documentos Científicos**

| **ID del requerimiento** | RF23 |
| --- | --- |
| **Nombre del requerimiento** | Extracción de Datos de Documentos Científicos |
| **Descripción** | El sistema debe poder extraer información relevante de documentos científicos (PDFs, artículos) utilizando procesamiento de lenguaje natural e IA. |
| **Prioridad** | Ideal |
| **Módulo** | IA/Simulación |
| **Casos de uso** | - Usuario sube documento científico<br>- Sistema extrae información relevante<br>- Sistema muestra datos extraídos |
| **Criterios de aceptación** | - Se pueden subir documentos en formato PDF<br>- Se extraen: propiedades, dosis, interacciones, contraindicaciones<br>- Se muestra información extraída de forma estructurada<br>- Se puede validar y corregir información extraída<br>- Se guarda información extraída para referencia |

---

### **RF25 - Creación de Órdenes de Lote**

| **ID del requerimiento** | RF25 |
| --- | --- |
| **Nombre del requerimiento** | Creación de Órdenes de Lote |
| **Descripción** | El sistema debe permitir crear órdenes de producción de lotes, asociando una fórmula aprobada, definiendo cantidad y asignando responsable. |
| **Prioridad** | Esencial |
| **Módulo** | Producción |
| **Casos de uso** | - Usuario crea orden de lote<br>- Usuario selecciona fórmula<br>- Usuario define cantidad<br>- Sistema genera número de lote |
| **Criterios de aceptación** | - Se puede crear orden de lote desde fórmula aprobada<br>- Se asigna número único de lote automáticamente<br>- Se define cantidad a producir<br>- Se asigna responsable de producción<br>- Se establece fecha programada<br>- Se genera BOM de producción automáticamente |

---

### **RF26 - Dispensación Digital de Materiales**

| **ID del requerimiento** | RF26 |
| --- | --- |
| **Nombre del requerimiento** | Dispensación Digital de Materiales |
| **Descripción** | El sistema debe permitir registrar la dispensación digital de materiales para producción, validando disponibilidad y registrando cantidades dispensadas. |
| **Prioridad** | Esencial |
| **Módulo** | Producción |
| **Casos de uso** | - Usuario inicia dispensación de materiales<br>- Sistema valida disponibilidad<br>- Usuario registra cantidades dispensadas<br>- Sistema actualiza inventario |
| **Criterios de aceptación** | - Se valida disponibilidad de materiales antes de dispensar<br>- Se registra cantidad dispensada con timestamp<br>- Se registra usuario que realiza dispensación<br>- Se actualiza inventario automáticamente<br>- Se genera registro de trazabilidad<br>- Se valida que cantidades no excedan disponibles |

---

### **RF27 - Line Clearance**

| **ID del requerimiento** | RF27 |
| --- | --- |
| **Nombre del requerimiento** | Line Clearance |
| **Descripción** | El sistema debe permitir realizar line clearance (limpieza y liberación de líneas de producción) con registro de verificaciones y firma del supervisor. |
| **Prioridad** | Esencial |
| **Módulo** | Producción |
| **Casos de uso** | - Supervisor realiza line clearance<br>- Supervisor verifica limpieza<br>- Supervisor firma digitalmente<br>- Línea queda liberada |
| **Criterios de aceptación** | - Se registran verificaciones de limpieza<br>- Se pueden adjuntar fotos o documentos<br>- Se requiere firma digital del supervisor<br>- Se registra timestamp de liberación<br>- La línea queda disponible para siguiente lote<br>- Se mantiene historial de line clearances |

---

### **RF28 - Seguimiento de Estado de Lotes**

| **ID del requerimiento** | RF28 |
| --- | --- |
| **Nombre del requerimiento** | Seguimiento de Estado de Lotes |
| **Descripción** | El sistema debe permitir seguir el estado de lotes en tiempo real, mostrando en qué etapa del proceso se encuentra cada lote. |
| **Prioridad** | Esencial |
| **Módulo** | Producción |
| **Casos de uso** | - Usuario consulta estado de lote<br>- Sistema muestra etapa actual<br>- Usuario puede ver historial de estados |
| **Criterios de aceptación** | - Se muestra estado actual del lote (en producción, en pruebas, pendiente aprobación, etc.)<br>- Se puede ver historial de cambios de estado<br>- Se muestra fecha/hora de cada cambio de estado<br>- Se puede filtrar lotes por estado<br>- Se actualiza en tiempo real |

---

### **RF29 - Registro de Muestras**

| **ID del requerimiento** | RF29 |
| --- | --- |
| **Nombre del requerimiento** | Registro de Muestras |
| **Descripción** | El sistema debe permitir registrar muestras tomadas de lotes, asignando número único, vinculando con lote y registrando información de cadena de custodia. |
| **Prioridad** | Esencial |
| **Módulo** | Pruebas/Control de Calidad (LIMS) |
| **Casos de uso** | - Analista registra muestra<br>- Sistema asigna número único<br>- Analista vincula con lote<br>- Sistema registra información |
| **Criterios de aceptación** | - Se asigna número único de muestra automáticamente<br>- Se vincula muestra con lote de origen<br>- Se registra: fecha de toma, responsable, tipo de muestra<br>- Se registra cadena de custodia<br>- Se puede adjuntar información adicional<br>- Se puede buscar muestra por número o lote |

---

### **RF30 - Registro de Pruebas Analíticas**

| **ID del requerimiento** | RF30 |
| --- | --- |
| **Nombre del requerimiento** | Registro de Pruebas Analíticas |
| **Descripción** | El sistema debe permitir registrar resultados de pruebas analíticas realizadas a muestras, incluyendo método utilizado, resultados y conclusiones. |
| **Prioridad** | Esencial |
| **Módulo** | Pruebas/Control de Calidad (LIMS) |
| **Casos de uso** | - Analista registra resultados de prueba<br>- Analista ingresa valores obtenidos<br>- Sistema valida contra especificaciones<br>- Sistema registra resultado |
| **Criterios de aceptación** | - Se registra método analítico utilizado<br>- Se ingresan valores numéricos obtenidos<br>- Se valida contra especificaciones del producto<br>- Se registra conclusión (conforme/no conforme)<br>- Se registra analista responsable<br>- Se registra fecha y hora de prueba<br>- Se puede adjuntar gráficos o datos adicionales |

---

### **RF31 - Gestión de Resultados OOS**

| **ID del requerimiento** | RF31 |
| --- | --- |
| **Nombre del requerimiento** | Gestión de Resultados OOS |
| **Descripción** | El sistema debe permitir gestionar resultados Out of Specification (OOS), iniciando investigación, registrando hallazgos y definiendo acciones correctivas. |
| **Prioridad** | Esencial |
| **Módulo** | Pruebas/Control de Calidad (LIMS) |
| **Casos de uso** | - Sistema detecta resultado OOS<br>- Analista inicia investigación<br>- Analista registra hallazgos<br>- Se define acción correctiva |
| **Criterios de aceptación** | - Se detecta automáticamente resultado OOS<br>- Se inicia proceso de investigación obligatorio<br>- Se registran hallazgos de investigación<br>- Se puede vincular con NC y CAPA<br>- Se requiere aprobación antes de cerrar investigación<br>- Se mantiene historial completo de investigación |

---

### **RF32 - Control de Calibración de Equipos**

| **ID del requerimiento** | RF32 |
| --- | --- |
| **Nombre del requerimiento** | Control de Calibración de Equipos |
| **Descripción** | El sistema debe permitir gestionar el control de calibración de equipos de laboratorio, registrando fechas de calibración, vencimientos y estados. |
| **Prioridad** | Esencial |
| **Módulo** | Pruebas/Control de Calidad (LIMS) |
| **Casos de uso** | - Usuario registra calibración de equipo<br>- Sistema registra fecha de vencimiento<br>- Sistema alerta cuando está por vencer<br>- Se valida calibración antes de usar equipo |
| **Criterios de aceptación** | - Se registran equipos con información de calibración<br>- Se registra fecha de última calibración<br>- Se calcula fecha de vencimiento<br>- Se alerta cuando calibración está por vencer<br>- Se valida que equipo esté calibrado antes de registrar pruebas<br>- Se mantiene historial de calibraciones |

---

### **RF33 - Alertas Automáticas para OOS**

| **ID del requerimiento** | RF33 |
| --- | --- |
| **Nombre del requerimiento** | Alertas Automáticas para OOS |
| **Descripción** | El sistema debe generar alertas automáticas cuando se detecta un resultado OOS, notificando a los responsables correspondientes. |
| **Prioridad** | Ideal |
| **Módulo** | Pruebas/Control de Calidad (LIMS) |
| **Casos de uso** | - Sistema detecta resultado OOS<br>- Sistema genera alerta<br>- Responsables reciben notificación |
| **Criterios de aceptación** | - Se genera alerta inmediatamente al detectar OOS<br>- Se notifica a: supervisor, QA Manager, responsable del lote<br>- La alerta aparece en dashboard<br>- Se envía notificación por email<br>- La alerta permanece hasta que se inicia investigación |

---

### **RF34 - Liberación de Producto con Firma Digital**

| **ID del requerimiento** | RF34 |
| --- | --- |
| **Nombre del requerimiento** | Liberación de Producto con Firma Digital |
| **Descripción** | El sistema debe permitir la liberación de productos con firma digital. Una vez firmado, el registro debe ser inalterable. La firma debe incluir timestamp y información del usuario que firma. |
| **Prioridad** | Esencial |
| **Módulo** | Aprobación/QA |
| **Casos de uso** | - QA Manager revisa lote<br>- QA Manager firma digitalmente para liberar<br>- Sistema registra firma con timestamp<br>- Registro se vuelve inalterable |
| **Criterios de aceptación** | - Solo usuarios con rol qa_manager o admin pueden firmar<br>- La firma incluye: usuario, timestamp, hash del documento<br>- Una vez firmado, el registro no puede modificarse<br>- Se registra en auditoría la acción de firma<br>- Se cumple con principios ALCOA+ |

---

### **RF35 - Gestión de No Conformidades**

| **ID del requerimiento** | RF35 |
| --- | --- |
| **Nombre del requerimiento** | Gestión de No Conformidades |
| **Descripción** | El sistema debe permitir crear, gestionar y dar seguimiento a No Conformidades (NC), incluyendo clasificación, asignación de responsable y seguimiento hasta cierre. |
| **Prioridad** | Esencial |
| **Módulo** | Aprobación/QA |
| **Casos de uso** | - Usuario detecta no conformidad<br>- Usuario crea registro de NC<br>- Se asigna responsable<br>- Se da seguimiento hasta cierre |
| **Criterios de aceptación** | - Se puede crear NC con descripción y clasificación<br>- Se asigna número único automáticamente<br>- Se clasifica por tipo y severidad<br>- Se asigna responsable de investigación<br>- Se puede vincular con lote, muestra o proceso<br>- Se da seguimiento hasta cierre<br>- Se requiere aprobación para cerrar NC |

---

### **RF36 - Gestión de CAPA**

| **ID del requerimiento** | RF36 |
| --- | --- |
| **Nombre del requerimiento** | Gestión de CAPA |
| **Descripción** | El sistema debe permitir crear y gestionar Acciones Correctivas y Preventivas (CAPA), vinculándolas con NC, definiendo acciones y dando seguimiento a su cumplimiento. |
| **Prioridad** | Esencial |
| **Módulo** | Aprobación/QA |
| **Casos de uso** | - Usuario crea CAPA vinculada a NC<br>- Usuario define acciones<br>- Usuario da seguimiento<br>- Usuario cierra CAPA |
| **Criterios de aceptación** | - Se puede crear CAPA vinculada a NC<br>- Se definen acciones correctivas y preventivas<br>- Se asigna responsable y fecha de vencimiento<br>- Se da seguimiento al cumplimiento<br>- Se alerta cuando está por vencer<br>- Se requiere evidencia para cerrar CAPA<br>- Se requiere aprobación para cerrar |

---

### **RF37 - Control de Cambios**

| **ID del requerimiento** | RF37 |
| --- | --- |
| **Nombre del requerimiento** | Control de Cambios |
| **Descripción** | El sistema debe permitir gestionar cambios en documentos, procesos y formulaciones mediante un proceso controlado que incluya justificación, aprobación e implementación. |
| **Prioridad** | Esencial |
| **Módulo** | Aprobación/QA |
| **Casos de uso** | - Usuario solicita cambio<br>- Usuario justifica cambio<br>- Se aprueba o rechaza cambio<br>- Se implementa cambio aprobado |
| **Criterios de aceptación** | - Se puede solicitar cambio con justificación<br>- Se requiere aprobación de QA Manager<br>- Se registra quién solicita, quién aprueba y cuándo<br>- Se mantiene versión anterior para referencia<br>- Se notifica a usuarios afectados<br>- Se registra implementación del cambio |

---

### **RF39 - Trazabilidad Hacia Atrás**

| **ID del requerimiento** | RF39 |
| --- | --- |
| **Nombre del requerimiento** | Trazabilidad Hacia Atrás |
| **Descripción** | El sistema debe permitir rastrear hacia atrás desde un producto final hasta las materias primas utilizadas, mostrando toda la cadena de suministro. |
| **Prioridad** | Esencial |
| **Módulo** | Trazabilidad |
| **Casos de uso** | - Usuario selecciona producto final<br>- Sistema rastrea hacia atrás<br>- Sistema muestra materias primas origen |
| **Criterios de aceptación** | - Se puede rastrear desde producto final hasta materias primas<br>- Se muestra toda la cadena de suministro<br>- Se incluyen: proveedores, fechas de recepción, números de lote<br>- Se puede exportar reporte de trazabilidad hacia atrás<br>- La información se muestra en formato de árbol o línea de tiempo |

---

### **RF40 - Trazabilidad Hacia Adelante**

| **ID del requerimiento** | RF40 |
| --- | --- |
| **Nombre del requerimiento** | Trazabilidad Hacia Adelante |
| **Descripción** | El sistema debe permitir rastrear hacia adelante desde una materia prima hasta los productos finales donde fue utilizada y su distribución. |
| **Prioridad** | Esencial |
| **Módulo** | Trazabilidad |
| **Casos de uso** | - Usuario selecciona materia prima o lote<br>- Sistema rastrea hacia adelante<br>- Sistema muestra productos finales y distribución |
| **Criterios de aceptación** | - Se puede rastrear desde materia prima hasta productos finales<br>- Se muestra en qué lotes se utilizó<br>- Se muestra distribución de productos finales<br>- Se incluyen: clientes, fechas de distribución, números de lote<br>- Se puede exportar reporte de trazabilidad hacia adelante |

---

### **RF41 - Gestión de Retiros del Mercado**

| **ID del requerimiento** | RF41 |
| --- | --- |
| **Nombre del requerimiento** | Gestión de Retiros del Mercado |
| **Descripción** | El sistema debe permitir gestionar retiros del mercado de productos, identificando lotes afectados, clientes y registrando acciones tomadas. |
| **Prioridad** | Ideal |
| **Módulo** | Trazabilidad |
| **Casos de uso** | - Se detecta problema con producto<br>- QA Manager inicia retiro<br>- Sistema identifica lotes afectados<br>- Se registran acciones de retiro |
| **Criterios de aceptación** | - Se puede iniciar proceso de retiro<br>- El sistema identifica automáticamente lotes afectados<br>- Se identifican clientes que recibieron lotes<br>- Se registran acciones de retiro tomadas<br>- Se mantiene historial completo del retiro<br>- Se requiere aprobación para iniciar retiro |

---

### **RF42 - Gestión de SOPs**

| **ID del requerimiento** | RF42 |
| --- | --- |
| **Nombre del requerimiento** | Gestión de SOPs |
| **Descripción** | El sistema debe permitir gestionar Procedimientos Operativos Estándar (SOPs), incluyendo creación, revisión, aprobación y control de versiones. |
| **Prioridad** | Esencial |
| **Módulo** | Base de Conocimiento |
| **Casos de uso** | - Usuario crea nuevo SOP<br>- Usuario revisa y aprueba SOP<br>- Usuario consulta SOP vigente |
| **Criterios de aceptación** | - Se pueden crear, editar y eliminar SOPs<br>- Se mantiene control de versiones<br>- Se requiere aprobación antes de publicar<br>- Se puede buscar SOPs por nombre, categoría, número<br>- Se muestra versión vigente<br>- Se puede acceder a versiones anteriores |

---

### **RF43 - Control de Versiones de Documentos**

| **ID del requerimiento** | RF43 |
| --- | --- |
| **Nombre del requerimiento** | Control de Versiones de Documentos |
| **Descripción** | El sistema debe mantener control de versiones de todos los documentos (SOPs, guías, farmacopeas), permitiendo ver historial y comparar versiones. |
| **Prioridad** | Esencial |
| **Módulo** | Base de Conocimiento |
| **Casos de uso** | - Usuario modifica documento<br>- Sistema crea nueva versión<br>- Usuario compara versiones |
| **Criterios de aceptación** | - Cada modificación crea nueva versión<br>- Se mantiene historial completo de versiones<br>- Se puede ver y descargar cualquier versión<br>- Se puede comparar dos versiones<br>- Se muestra versión vigente claramente<br>- Se registra quién y cuándo modificó cada versión |

---

### **RF44 - Búsqueda de Documentos**

| **ID del requerimiento** | RF44 |
| --- | --- |
| **Nombre del requerimiento** | Búsqueda de Documentos |
| **Descripción** | El sistema debe permitir buscar documentos en la base de conocimiento mediante búsqueda full-text, filtros y categorías. |
| **Prioridad** | Esencial |
| **Módulo** | Base de Conocimiento |
| **Casos de uso** | - Usuario busca documento<br>- Sistema muestra resultados<br>- Usuario accede al documento |
| **Criterios de aceptación** | - Se puede buscar por texto en contenido<br>- Se puede filtrar por tipo, categoría, fecha<br>- Los resultados se ordenan por relevancia<br>- Se muestra vista previa del documento<br>- Se puede acceder directamente al documento<br>- El tiempo de búsqueda es menor a 3 segundos |

---

### **RF45 - Gestión de Usuarios**

| **ID del requerimiento** | RF45 |
| --- | --- |
| **Nombre del requerimiento** | Gestión de Usuarios |
| **Descripción** | El sistema debe permitir a los administradores gestionar usuarios: crear, editar, desactivar y eliminar usuarios del sistema. |
| **Prioridad** | Esencial |
| **Módulo** | Configuración |
| **Casos de uso** | - Administrador crea nuevo usuario<br>- Administrador edita información de usuario<br>- Administrador desactiva usuario |
| **Criterios de aceptación** | - Solo administradores pueden gestionar usuarios<br>- Se puede crear usuario con email, nombre, rol<br>- Se puede editar información de usuario<br>- Se puede desactivar usuario (no eliminar)<br>- Se puede reactivar usuario desactivado<br>- Se valida que email sea único<br>- Se registra quién y cuándo modificó usuario |

---

### **RF46 - Gestión de Roles y Permisos**

| **ID del requerimiento** | RF46 |
| --- | --- |
| **Nombre del requerimiento** | Gestión de Roles y Permisos |
| **Descripción** | El sistema debe permitir gestionar roles y sus permisos asociados, definiendo qué funcionalidades puede acceder cada rol. |
| **Prioridad** | Esencial |
| **Módulo** | Configuración |
| **Casos de uso** | - Administrador consulta roles<br>- Administrador modifica permisos de rol<br>- Sistema aplica permisos |
| **Criterios de aceptación** | - Se pueden ver todos los roles definidos<br>- Se pueden modificar permisos de cada rol<br>- Los cambios se aplican inmediatamente<br>- Se valida que al menos un rol tenga permisos de administración<br>- Se registra quién modificó permisos<br>- Se mantiene historial de cambios de permisos |

---

### **RF47 - Configuración de Equipos**

| **ID del requerimiento** | RF47 |
| --- | --- |
| **Nombre del requerimiento** | Configuración de Equipos |
| **Descripción** | El sistema debe permitir configurar equipos de laboratorio y producción, registrando información, calibraciones y estados. |
| **Prioridad** | Esencial |
| **Módulo** | Configuración |
| **Casos de uso** | - Administrador registra nuevo equipo<br>- Administrador configura calibración<br>- Sistema valida calibración en uso |
| **Criterios de aceptación** | - Se pueden crear, editar y desactivar equipos<br>- Se registra información: nombre, tipo, modelo, serie<br>- Se configura frecuencia de calibración<br>- Se vincula con control de calibración<br>- Se valida calibración antes de usar en pruebas<br>- Se mantiene historial de configuraciones |

---

### **RF38 - Trazabilidad Completa de Lotes**

| **ID del requerimiento** | RF38 |
| --- | --- |
| **Nombre del requerimiento** | Trazabilidad Completa de Lotes |
| **Descripción** | El sistema debe permitir rastrear cualquier lote desde las materias primas hasta el producto final distribuido, mostrando toda la cadena de suministro y procesos aplicados. |
| **Prioridad** | Esencial |
| **Módulo** | Trazabilidad |
| **Casos de uso** | - Usuario busca lote por número<br>- Sistema muestra línea de tiempo completa<br>- Usuario puede ver todos los procesos y movimientos |
| **Criterios de aceptación** | - El sistema muestra línea de tiempo completa del lote<br>- Incluye: recepción de materias primas, producción, pruebas, aprobación, distribución<br>- Se puede filtrar por tipo de evento<br>- Se puede exportar reporte de trazabilidad<br>- La información es accesible en menos de 5 segundos |

---

### **RF24 - Análisis de Tendencias**

| **ID del requerimiento** | RF24 |
| --- | --- |
| **Nombre del requerimiento** | Análisis de Tendencias |
| **Descripción** | El sistema debe analizar tendencias y patrones en formulaciones exitosas, proporcionando insights para mejorar futuras formulaciones. |
| **Prioridad** | Opcional |
| **Módulo** | IA/Simulación |
| **Casos de uso** | - Usuario solicita análisis de tendencias<br>- Sistema analiza datos históricos<br>- Sistema muestra tendencias y patrones |
| **Criterios de aceptación** | - Se analizan formulaciones históricas<br>- Se identifican ingredientes más utilizados<br>- Se identifican combinaciones exitosas<br>- Se muestran tendencias en gráficos<br>- Se pueden exportar reportes de análisis |

---

## 5.2 Requisitos No Funcionales

### **RNF01 - Rendimiento**

**Descripción:** El sistema debe responder a las solicitudes de usuario en un tiempo máximo de 2 segundos para operaciones estándar y 5 segundos para operaciones complejas (búsquedas, reportes).

**Criterios de aceptación:**
- Tiempo de respuesta promedio < 2 segundos
- Tiempo de respuesta máximo < 5 segundos para operaciones complejas
- Soporte para al menos 50 usuarios concurrentes
- Base de datos optimizada con índices apropiados

---

### **RNF02 - Escalabilidad**

**Descripción:** El sistema debe ser escalable para crecer con las necesidades de la empresa sin requerir cambios arquitectónicos mayores.

**Criterios de aceptación:**
- Arquitectura permite escalado horizontal
- Base de datos puede manejar crecimiento de datos
- API diseñada para soportar mayor carga
- Código modular y extensible

---

### **RNF03 - Seguridad**

**Descripción:** El sistema debe implementar medidas de seguridad robustas para proteger datos y prevenir accesos no autorizados.

**Criterios de aceptación:**
- Encriptación de contraseñas con bcrypt
- Autenticación mediante JWT
- Autorización basada en roles
- Headers de seguridad HTTP (Helmet)
- Rate limiting para prevenir ataques
- Validación de inputs en todas las capas
- Cumplimiento con Ley 1581 de 2012 (protección de datos)

---

### **RNF04 - Disponibilidad**

**Descripción:** El sistema debe estar disponible el 99.5% del tiempo, con mantenimiento programado fuera de horarios de producción.

**Criterios de aceptación:**
- Uptime mínimo de 99.5%
- Plan de respaldo y recuperación
- Monitoreo de disponibilidad
- Notificación de mantenimiento programado

---

### **RNF05 - Usabilidad**

**Descripción:** El sistema debe tener una interfaz intuitiva y fácil de usar, con diseño responsive para diferentes dispositivos.

**Criterios de aceptación:**
- Interfaz intuitiva y moderna
- Diseño responsive (desktop, tablet, móvil)
- Navegación clara y consistente
- Mensajes de error claros y útiles
- Documentación de usuario disponible
- Tiempo de aprendizaje < 4 horas para usuarios básicos

---

### **RNF06 - Compatibilidad**

**Descripción:** El sistema debe ser compatible con navegadores modernos y dispositivos móviles.

**Criterios de aceptación:**
- Compatible con Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- Compatible con dispositivos iOS y Android
- Funcionalidad PWA en dispositivos móviles
- API RESTful para integración con otros sistemas

---

### **RNF07 - Mantenibilidad**

**Descripción:** El código debe ser limpio, bien documentado y fácil de mantener.

**Criterios de aceptación:**
- Código con comentarios JSDoc
- Estructura modular y organizada
- Nombres descriptivos de variables y funciones
- Documentación técnica completa
- Tests unitarios y de integración

---

### **RNF08 - Cumplimiento Regulatorio**

**Descripción:** El sistema debe cumplir con todas las normativas regulatorias colombianas aplicables.

**Criterios de aceptación:**
- Cumplimiento con Decreto 3249 de 2006 (BPM)
- Cumplimiento con Ley 1581 de 2012 (protección de datos)
- Implementación de principios ALCOA+
- Validación del sistema según BPM
- Documentación para auditorías

---

### **RNF09 - Integridad de Datos**

**Descripción:** El sistema debe garantizar la integridad de los datos según principios ALCOA+.

**Criterios de aceptación:**
- Datos atribuibles (quién, cuándo)
- Datos legibles y comprensibles
- Datos contemporáneos (registrados en tiempo real)
- Datos originales (no modificados)
- Datos precisos y completos
- Datos consistentes
- Datos duraderos y disponibles

---

### **RNF10 - Trazabilidad de Auditoría**

**Descripción:** El sistema debe mantener registros completos de auditoría de todas las acciones importantes.

**Criterios de aceptación:**
- Registro de todas las acciones críticas
- Timestamps automáticos
- Registros inalterables una vez creados
- Búsqueda y filtrado de registros de auditoría
- Exportación de logs de auditoría

---

### **RNF11 - PWA (Progressive Web App)**

**Descripción:** El sistema debe funcionar como PWA con funcionalidad offline básica.

**Criterios de aceptación:**
- Instalable en dispositivos móviles
- Funcionalidad offline básica
- Service Worker implementado
- Manifest configurado
- Actualización automática cuando hay conexión

---

### **RNF12 - Internacionalización**

**Descripción:** El sistema debe soportar español como idioma principal, con posibilidad de expansión futura.

**Criterios de aceptación:**
- Interfaz completamente en español
- Formatos de fecha y números según estándares colombianos
- Mensajes de error en español
- Documentación en español

---

## 6. Restricciones del software

---

### **Restricciones Técnicas**

- **Base de Datos**: MySQL 8.0 o superior
- **Runtime Backend**: Java 21 o superior
- **Framework Backend**: Spring Boot 4.0.0 o superior
- **Framework Frontend**: React 18 o superior con Vite
- **Navegadores**: Últimas 2 versiones de Chrome, Firefox, Safari, Edge
- **Sistema Operativo Servidor**: Linux recomendado, Windows Server soportado
- **Memoria RAM**: Mínimo 4GB para servidor, 2GB para cliente
- **Espacio en Disco**: Mínimo 50GB para base de datos en producción

### **Restricciones de Seguridad**

- Cumplimiento obligatorio con Ley 1581 de 2012 (Protección de Datos Personales)
- Cumplimiento obligatorio con Decreto 3249 de 2006 (BPM)
- Implementación obligatoria de principios ALCOA+
- Encriptación de datos sensibles en tránsito y en reposo
- Autenticación obligatoria para todas las funcionalidades
- Registros de auditoría inalterables

### **Restricciones de Integración**

- Dependencia de APIs externas para bases de datos moleculares (PubChem, ChEMBL, DrugBank, ZINC)
- Requiere conexión a internet para funcionalidades de investigación
- Integración con sistemas ERP futura (no incluida en fase inicial)

### **Restricciones de Infraestructura**

- Requiere servidor dedicado o cloud para producción
- Requiere backup diario de base de datos
- Requiere monitoreo de servidor y aplicación
- Requiere certificado SSL para producción

### **Restricciones de Usuario**

- Requiere capacitación de usuarios antes de implementación
- Requiere conexión a internet para uso completo
- Navegador moderno requerido
- Dispositivos móviles deben tener sistema operativo actualizado

### **Restricciones Regulatorias**

- Sistema debe ser validado según BPM antes de uso en producción
- Documentación completa requerida para auditorías
- Cambios al sistema requieren validación
- Registros deben mantenerse según períodos de retención regulatorios

### **Restricciones de Desarrollo**

- Código debe seguir estándares de código limpio
- Documentación técnica obligatoria
- Tests unitarios requeridos para funcionalidades críticas
- Code review obligatorio antes de merge

---

## 7. Anexos

En esta sección se incluyen todos los documentos, materiales y pruebas que fueron recopilados durante el proceso de desarrollo y análisis del sistema. Estos anexos proporcionan evidencia adicional y soporte para los requisitos y decisiones descritos en el documento principal.

### **7.1 Pruebas**

*Esta sección se completará durante la fase de pruebas del proyecto con:*
- Plan de pruebas
- Casos de prueba
- Resultados de pruebas unitarias
- Resultados de pruebas de integración
- Resultados de pruebas de sistema
- Resultados de pruebas de aceptación de usuario
- Reportes de bugs y su resolución

### **7.2 Diagramas**

*Esta sección incluirá:*
- Diagrama de arquitectura del sistema
- Diagrama de base de datos (ERD)
- Diagramas de flujo de procesos principales
- Diagramas de casos de uso
- Diagramas de secuencia para funcionalidades críticas

### **7.3 Glosario**

**Términos Técnicos:**
- **PLM**: Product Lifecycle Management (Gestión del Ciclo de Vida del Producto)
- **LIMS**: Laboratory Information Management System (Sistema de Información de Laboratorio)
- **BOM**: Bill of Materials (Lista de Materiales)
- **JWT**: JSON Web Token (Token de autenticación)
- **RBAC**: Role-Based Access Control (Control de Acceso Basado en Roles)
- **API**: Application Programming Interface (Interfaz de Programación de Aplicaciones)
- **PWA**: Progressive Web App (Aplicación Web Progresiva)
- **ORM**: Object-Relational Mapping (Mapeo Objeto-Relacional)

**Términos Regulatorios:**
- **BPM**: Buenas Prácticas de Manufactura
- **INVIMA**: Instituto Nacional de Vigilancia de Medicamentos y Alimentos
- **ALCOA+**: Principios de integridad de datos (Attributable, Legible, Contemporaneous, Original, Accurate, Complete, Consistent, Enduring, Available)
- **NC**: No Conformidad
- **CAPA**: Corrective and Preventive Action (Acción Correctiva y Preventiva)
- **OOS**: Out of Specification (Fuera de Especificación)
- **SOP**: Standard Operating Procedure (Procedimiento Operativo Estándar)

**Términos del Dominio:**
- **Lote**: Cantidad de producto fabricado en un proceso continuo
- **Materia Prima**: Ingrediente utilizado en la fabricación
- **Producto Terminado**: Producto final listo para distribución
- **Muestra**: Porción de material tomada para análisis
- **Calibración**: Verificación y ajuste de equipos de medición
- **Trazabilidad**: Capacidad de rastrear el historial de un producto

### **7.4 Casos de Uso**

*Esta sección se completará con casos de uso detallados para cada módulo principal, incluyendo:*
- Actores involucrados
- Flujo principal
- Flujos alternativos
- Precondiciones
- Postcondiciones
- Excepciones

### **7.5 Documentos de Referencia**

- PT-PP-01 Planteamiento del Problema
- Documentación técnica del backend
- Documentación técnica del frontend
- Manual de usuario (futuro)
- Manual de administración (futuro)

---

**Fin del Documento**

