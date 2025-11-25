# 🎨 Prototipado del Sistema
## Omega Lab - Sistema PLM/LIMS
**Versión:** 1.0

---

> 💡 **Nota sobre Prototipos**
> 
> Este documento aloja los prototipos gráficos del software, pueden ser de baja o alta fidelidad. Los prototipos no hacen parte de la maquetación de las interfaces en HTML5 ya que precisamente se busca tener un primer acercamiento para realizar posteriormente ese proceso que corresponde netamente al desarrollo FrontEnd del proyecto. Se recomienda trabajar con bocetos iniciales mediante el uso de herramientas como Balsamiq Mockups, Mockplus, Figma o similares.

---

## 📋 Historial de Revisión

| Versión | Fecha Elaboración | Responsable Elaboración | Fecha Aprobación | Responsable Aprobación |
| --- | --- | --- | --- | --- |
| 1.0 | 2024-12-XX | Equipo de Desarrollo Omega Lab |  |  |

---

## 📝 Cambios Respecto a la Versión Anterior

| **Versión** | **Modificación Respecto Versión Anterior** |
| --- | --- |
| 1.0 | Documento inicial - Prototipos del sistema PLM/LIMS |

---

## 📑 Tabla de Contenido

1. [Introducción](#1-introducción)
2. [Arquitectura de Información](#2-arquitectura-de-información)
   - 2.1 [Estructura de Navegación del Sistema](#21-estructura-de-navegación-del-sistema)
   - 2.2 [Consideraciones para la Navegación](#22-consideraciones-para-la-navegación)
3. [Prototipos](#3-prototipos)
   - 3.1 [Autenticación y Autorización](#31-autenticación-y-autorización)
   - 3.2 [Dashboard](#32-dashboard)
   - 3.3 [Gestión de Productos y Formulaciones](#33-gestión-de-productos-y-formulaciones)
   - 3.4 [Generación de Ideas mediante IA (SupervisorQA)](#34-generación-de-ideas-mediante-ia-supervisorqa)
   - 3.5 [Gestión de Ideas (Analista)](#35-gestión-de-ideas-analista)
   - 3.6 [Gestión de Pruebas (LIMS)](#36-gestión-de-pruebas-lims)
   - 3.7 [Aprobación de Ideas (SupervisorQA)](#37-aprobación-de-ideas-supervisorqa)
   - 3.8 [Gestión de Materiales e Inventario](#38-gestión-de-materiales-e-inventario)
   - 3.9 [Configuración y Administración](#39-configuración-y-administración)

---

## 1. Introducción

### **Objetivos del Prototipo**

El objetivo de este documento es presentar los prototipos gráficos del sistema PLM/LIMS para Omega Lab, proporcionando una visión preliminar del diseño y funcionalidad de las interfaces de usuario. Los prototipos facilitan:

- ✅ **Comprensión del Flujo**: Visualización clara del flujo de trabajo: Generación de Ideas (SupervisorQA) → Desarrollo/Pruebas (Analista) → Aprobación (SupervisorQA)
- ✅ **Validación de Requisitos**: Confirmar que las interfaces cumplen con los requisitos funcionales definidos
- ✅ **Mejora de Usabilidad**: Identificar oportunidades de mejora en la experiencia del usuario antes del desarrollo
- ✅ **Comunicación con Stakeholders**: Facilitar la comunicación con usuarios finales y partes interesadas
- ✅ **Guía para Desarrollo Frontend**: Servir como referencia para el equipo de desarrollo frontend

### **Alcance del Prototipado**

Este documento incluye prototipos de las principales pantallas del sistema:

- Autenticación y autorización
- Dashboard principal
- Gestión de productos y formulaciones (BOM)
- Generación de ideas mediante IA (módulo SupervisorQA)
- Gestión de ideas asignadas (módulo Analista)
- Gestión de pruebas y resultados (LIMS)
- Aprobación/rechazo de ideas (módulo SupervisorQA)
- Gestión de materiales e inventario
- Configuración y administración del sistema

### **Herramientas Utilizadas**

Los prototipos pueden ser desarrollados utilizando herramientas como:
- **Balsamiq Mockups**: Para prototipos de baja fidelidad
- **Figma**: Para prototipos de alta fidelidad e interactivos
- **Mockplus**: Para prototipos rápidos y colaborativos
- **Adobe XD**: Para prototipos avanzados con animaciones

---

## 2. Arquitectura de Información

### 2.1 Estructura de Navegación del Sistema

#### **2.1.1 Mapa de Navegación General**

El sistema está organizado en módulos principales accesibles desde un menú de navegación lateral o superior, dependiendo del rol del usuario:

```
┌─────────────────────────────────────────────────────────────┐
│                    OMEGA LAB - PLM/LIMS                      │
├─────────────────────────────────────────────────────────────┤
│ [Menú Principal]                                             │
│                                                               │
│  📊 Dashboard                                                │
│  🧪 Ideas/Research                                           │
│     ├─ Generar Ideas (Solo SupervisorQA)                    │
│     ├─ Mis Ideas Asignadas (Analista)                        │
│     └─ Todas las Ideas (SupervisorQA)                        │
│  📋 Formulaciones                                            │
│     ├─ Productos                                            │
│     └─ BOM (Bill of Materials)                              │
│  🔬 Pruebas (LIMS)                                           │
│     ├─ Crear Prueba                                         │
│     ├─ Mis Pruebas                                          │
│     └─ Resultados                                           │
│  📦 Inventario                                               │
│     ├─ Materiales                                           │
│     └─ Categorías                                           │
│  ⚙️  Configuración                                           │
│     ├─ Usuarios (Solo Admin)                                │
│     └─ Parámetros                                           │
│  👤 Perfil                                                   │
│  🚪 Cerrar Sesión                                           │
└─────────────────────────────────────────────────────────────┘
```

#### **2.1.2 Estructura de Navegación por Módulo**

**Módulo: Ideas/Research**

```
Dashboard
  └─ Ideas/Research
      ├─ [SupervisorQA] Generar Nueva Idea
      │   ├─ Seleccionar Producto Base
      │   ├─ Definir Objetivo
      │   ├─ Generar con IA
      │   └─ Asignar a Analista
      │
      ├─ [Analista] Mis Ideas Asignadas
      │   ├─ Ver Detalles de Idea
      │   ├─ Crear Prueba
      │   ├─ Registrar Resultados
      │   └─ Aceptar/Rechazar Idea
      │
      └─ [SupervisorQA] Todas las Ideas
          ├─ Ver Detalles
          ├─ Ver Pruebas Realizadas
          └─ Aprobar/Rechazar para Producción
```

**Módulo: Pruebas (LIMS)**

```
Dashboard
  └─ Pruebas (LIMS)
      ├─ Crear Nueva Prueba
      │   ├─ Seleccionar Idea
      │   ├─ Definir Tipo de Prueba
      │   └─ Registrar Resultados
      │
      ├─ Mis Pruebas
      │   ├─ Ver Detalles
      │   ├─ Editar Resultados
      │   └─ Completar Prueba
      │
      └─ Resultados
          ├─ Filtrar por Idea
          ├─ Filtrar por Estado
          └─ Exportar Reportes
```

**Módulo: Formulaciones**

```
Dashboard
  └─ Formulaciones
      ├─ Productos
      │   ├─ Lista de Productos
      │   ├─ Crear Producto
      │   ├─ Ver Detalles
      │   └─ Gestionar BOM
      │
      └─ BOM (Bill of Materials)
          ├─ Ver BOM de Producto
          ├─ Crear Nueva Versión
          ├─ Comparar Versiones
          └─ Historial de Cambios
```

### **2.2 Consideraciones para la Navegación**

- ✅ **Usabilidad**: Cada pantalla y función debe ser accesible desde la pantalla principal del módulo correspondiente con un flujo de navegación intuitivo. El flujo debe seguir el proceso natural: Generación → Desarrollo → Aprobación.

- ✅ **Accesibilidad**: Asegurar que todas las pantallas sean accesibles para usuarios con discapacidades, incluyendo opciones de navegación por teclado y soporte para lectores de pantalla. Cumplir con estándares WCAG 2.1.

- ✅ **Consistencia**: Mantener un diseño y flujo de navegación consistentes en todas las pantallas del sistema para evitar confusión y mejorar la experiencia del usuario. Uso de iconos consistentes y colores que indiquen estados (GENERADA, EN_PRUEBA, APROBADA, RECHAZADA).

- ✅ **Roles y Permisos**: La navegación debe adaptarse según el rol del usuario:
  - **SupervisorQA**: Acceso completo, puede generar ideas y aprobar/rechazar
  - **Analista**: Acceso limitado a ideas asignadas y creación de pruebas
  - **Supervisor**: Acceso de lectura y supervisión
  - **Administrador**: Acceso completo incluyendo configuración

- ✅ **Notificaciones**: Sistema de notificaciones visible que indique cuando hay nuevas ideas asignadas, pruebas completadas, o decisiones pendientes.

- ✅ **Breadcrumbs**: Navegación con migas de pan para indicar la ubicación actual en el sistema.

Este diseño de la estructura de navegación proporciona una guía clara para el desarrollo de las interfaces del sistema, asegurando que la interacción del usuario sea eficiente y satisfactoria, especialmente considerando el flujo crítico de generación, desarrollo y aprobación de ideas.

---

## 3. Prototipos

En esta sección se presentan los prototipos gráficos del sistema, detallando cada ventana o pantalla con descripciones y funcionalidades. Estos prototipos proporcionan una vista preliminar del diseño y funcionalidad de la interfaz, facilitando la comprensión del flujo y la interacción del usuario con el sistema.

### 3.1 Autenticación y Autorización

#### **3.1.1 Pantalla de Inicio de Sesión**

**Descripción**

La pantalla de inicio de sesión es el punto de entrada al sistema. Los usuarios deben autenticarse utilizando su email y contraseña. El sistema valida las credenciales y genera un token JWT para mantener la sesión activa.

**Elementos Principales:**
- Campo de email
- Campo de contraseña (con opción de mostrar/ocultar)
- Botón "Iniciar Sesión"
- Enlace "¿Olvidaste tu contraseña?" (funcionalidad futura)
- Logo y nombre del sistema (Omega Lab)

**Validaciones:**
- Email debe tener formato válido
- Contraseña requerida
- Mensajes de error claros para credenciales inválidas

**Flujo:**
1. Usuario ingresa email y contraseña
2. Sistema valida credenciales
3. Si es válido: redirige al Dashboard según rol
4. Si es inválido: muestra mensaje de error

---

#### **3.1.2 Pantalla de Registro (Solo Administrador)**

**Descripción**

Solo los administradores pueden registrar nuevos usuarios en el sistema. Esta pantalla permite crear usuarios asignándoles un rol específico (Analista, Supervisor, SupervisorQA, Administrador).

**Elementos Principales:**
- Campo de nombre completo
- Campo de email
- Campo de contraseña
- Campo de confirmación de contraseña
- Selector de rol
- Botón "Registrar Usuario"
- Botón "Cancelar"

**Validaciones:**
- Todos los campos son requeridos
- Email debe ser único
- Contraseña debe cumplir criterios de seguridad
- Las contraseñas deben coincidir

---

### 3.2 Dashboard

#### **3.2.1 Dashboard Principal**

**Descripción**

El dashboard proporciona una visión general del sistema adaptada al rol del usuario. Muestra métricas clave, notificaciones y acceso rápido a las funcionalidades principales.

**Elementos para SupervisorQA:**
- 📊 **Métricas Principales:**
  - Total de ideas generadas
  - Ideas pendientes de aprobación
  - Ideas aprobadas este mes
  - Ideas rechazadas
- 🔔 **Notificaciones:**
  - Nuevas pruebas completadas por analistas
  - Ideas que requieren decisión
- 📋 **Accesos Rápidos:**
  - Generar nueva idea
  - Ver todas las ideas
  - Aprobar ideas pendientes

**Elementos para Analista:**
- 📊 **Métricas Principales:**
  - Ideas asignadas pendientes
  - Pruebas en progreso
  - Pruebas completadas
- 🔔 **Notificaciones:**
  - Nuevas ideas asignadas
  - Recordatorios de pruebas pendientes
- 📋 **Accesos Rápidos:**
  - Ver mis ideas asignadas
  - Crear nueva prueba
  - Ver mis pruebas

**Elementos Comunes:**
- Menú de navegación lateral
- Barra superior con perfil de usuario
- Gráficos de tendencias (opcional)
- Actividad reciente

---

### 3.3 Gestión de Productos y Formulaciones

#### **3.3.1 Lista de Productos**

**Descripción**

Muestra todos los productos registrados en el sistema con sus formulaciones (BOM) asociadas. Permite buscar, filtrar y acceder a los detalles de cada producto.

**Elementos Principales:**
- Barra de búsqueda
- Filtros por categoría, estado
- Tabla de productos con columnas:
  - ID
  - Nombre
  - Categoría
  - Estado
  - Versión BOM actual
  - Acciones (Ver, Editar, Gestionar BOM)
- Botón "Crear Nuevo Producto"
- Paginación

**Funcionalidades:**
- Búsqueda por nombre o código
- Filtrado por categoría
- Ordenamiento por columnas
- Acceso rápido a gestión de BOM

---

#### **3.3.2 Gestión de BOM (Bill of Materials)**

**Descripción**

Permite visualizar y gestionar la formulación (BOM) de un producto, incluyendo control de versiones y historial de cambios.

**Elementos Principales:**
- Información del producto
- Selector de versión de BOM
- Tabla de items del BOM:
  - Material/Producto
  - Cantidad
  - Porcentaje
  - Unidad
  - Acciones
- Botón "Crear Nueva Versión"
- Botón "Comparar Versiones"
- Historial de cambios
- Botón "Agregar Item"
- Botón "Guardar Cambios"

**Funcionalidades:**
- Visualización de versión actual
- Creación de nuevas versiones
- Comparación entre versiones
- Historial completo de cambios
- Validación de que porcentajes sumen 100%

---

### 3.4 Generación de Ideas mediante IA (SupervisorQA)

#### **3.4.1 Generar Nueva Idea**

**Descripción**

Pantalla principal para que el SupervisorQA genere nuevas ideas de fórmulas utilizando inteligencia artificial basándose en productos existentes.

**Elementos Principales:**
- **Paso 1: Seleccionar Producto Base**
  - Lista de productos con sus formulaciones
  - Búsqueda y filtrado
  - Vista previa del BOM del producto seleccionado
- **Paso 2: Definir Objetivo**
  - Campo de texto para objetivo/interés
  - Sugerencias de objetivos comunes
  - Ejemplos de objetivos válidos
- **Paso 3: Configuración de Generación**
  - Botón "Generar Idea con IA"
  - Indicador de carga durante generación
  - Tiempo estimado de generación
- **Paso 4: Revisar Idea Generada**
  - Título de la idea
  - Descripción
  - Detalles técnicos generados por IA
  - Pruebas requeridas sugeridas
  - Prioridad y categoría
  - Botón "Asignar a Analista"
  - Botón "Generar Otra Idea"
  - Botón "Guardar como Borrador"

**Flujo:**
1. SupervisorQA selecciona producto base
2. Define objetivo para la nueva fórmula
3. Hace clic en "Generar Idea con IA"
4. Sistema muestra idea generada
5. SupervisorQA revisa y asigna a analista o genera otra

---

#### **3.4.2 Lista de Todas las Ideas (SupervisorQA)**

**Descripción**

Vista completa de todas las ideas generadas en el sistema, permitiendo al SupervisorQA ver el estado de cada una y tomar decisiones.

**Elementos Principales:**
- Filtros:
  - Por estado (GENERADA, EN_PRUEBA, APROBADA, RECHAZADA)
  - Por analista asignado
  - Por fecha
  - Por producto base
- Tabla de ideas con columnas:
  - ID
  - Título
  - Producto Base
  - Analista Asignado
  - Estado (con colores)
  - Fecha de Creación
  - Última Actualización
  - Acciones (Ver Detalles, Aprobar, Rechazar)
- Indicadores visuales de estado:
  - 🟡 GENERADA (amarillo)
  - 🔵 EN_PRUEBA (azul)
  - 🟢 APROBADA (verde)
  - 🔴 RECHAZADA (rojo)

**Funcionalidades:**
- Ver detalles completos de idea
- Ver pruebas realizadas
- Aprobar idea para producción
- Rechazar idea
- Filtrar y buscar

---

### 3.5 Gestión de Ideas (Analista)

#### **3.5.1 Mis Ideas Asignadas**

**Descripción**

Vista del Analista mostrando todas las ideas que le han sido asignadas para desarrollo y pruebas.

**Elementos Principales:**
- Lista de ideas asignadas
- Filtros por estado
- Tarjetas de ideas con:
  - Título
  - Producto base
  - Objetivo
  - Estado actual
  - Fecha de asignación
  - Pruebas realizadas
  - Botón "Ver Detalles"
  - Botón "Crear Prueba"
  - Botón "Aceptar Idea"
  - Botón "Rechazar Idea"

**Funcionalidades:**
- Ver detalles completos de idea asignada
- Crear pruebas asociadas
- Registrar resultados
- Aceptar o rechazar idea después de pruebas

---

#### **3.5.2 Detalles de Idea (Analista)**

**Descripción**

Vista detallada de una idea asignada, mostrando toda la información necesaria para el desarrollo y pruebas.

**Elementos Principales:**
- **Información de la Idea:**
  - Título
  - Descripción
  - Producto base (con enlace)
  - Objetivo definido
  - Detalles técnicos generados por IA
  - Pruebas requeridas sugeridas
  - Prioridad y categoría
- **Información del Producto Base:**
  - Nombre y descripción
  - BOM actual (formulación)
  - Materiales utilizados
- **Sección de Pruebas:**
  - Lista de pruebas realizadas
  - Botón "Crear Nueva Prueba"
  - Resultados de pruebas
- **Acciones:**
  - Botón "Aceptar Idea"
  - Botón "Rechazar Idea"
  - Botón "Volver a Lista"

---

### 3.6 Gestión de Pruebas (LIMS)

#### **3.6.1 Crear Nueva Prueba**

**Descripción**

Permite al Analista crear una nueva prueba asociada a una idea para registrar los resultados del desarrollo en el laboratorio.

**Elementos Principales:**
- Selector de idea (si no viene desde detalles de idea)
- Información de la idea seleccionada
- Formulario de prueba:
  - Tipo de prueba (select)
  - Descripción
  - Método utilizado
  - Fecha de realización
  - Observaciones
- Sección de resultados:
  - Agregar múltiples resultados
  - Para cada resultado:
    - Parámetro medido
    - Valor obtenido
    - Unidad
    - Especificación
    - Conforme/No Conforme
- Botón "Guardar Prueba"
- Botón "Guardar y Completar"
- Botón "Cancelar"

**Validaciones:**
- Idea debe estar seleccionada
- Tipo de prueba requerido
- Al menos un resultado debe ser registrado

---

#### **3.6.2 Lista de Pruebas**

**Descripción**

Muestra todas las pruebas realizadas, permitiendo filtrar y acceder a los detalles.

**Elementos Principales:**
- Filtros:
  - Por idea
  - Por tipo de prueba
  - Por estado
  - Por fecha
- Tabla de pruebas con columnas:
  - ID
  - Idea asociada
  - Tipo de prueba
  - Fecha
  - Resultado general
  - Analista responsable
  - Acciones (Ver Detalles, Editar)
- Botón "Crear Nueva Prueba"
- Exportar reportes (opcional)

---

#### **3.6.3 Detalles de Prueba**

**Descripción**

Vista detallada de una prueba con todos sus resultados y observaciones.

**Elementos Principales:**
- Información de la prueba
- Información de la idea asociada
- Lista de resultados:
  - Parámetro
  - Valor
  - Especificación
  - Estado (Conforme/No Conforme)
  - Observaciones
- Método utilizado
- Observaciones generales
- Botón "Editar Prueba"
- Botón "Completar Prueba"
- Botón "Exportar Reporte"

---

### 3.7 Aprobación de Ideas (SupervisorQA)

#### **3.7.1 Revisar Idea para Aprobación**

**Descripción**

Pantalla donde el SupervisorQA revisa una idea completa con todas sus pruebas y resultados para tomar la decisión final de aprobación o rechazo.

**Elementos Principales:**
- **Resumen de la Idea:**
  - Título y descripción
  - Producto base
  - Objetivo
  - Estado actual
- **Información del Analista:**
  - Nombre del analista asignado
  - Decisión del analista (Aceptada/Rechazada)
  - Comentarios del analista
- **Pruebas Realizadas:**
  - Lista de todas las pruebas
  - Resultados de cada prueba
  - Indicadores visuales (✅ Conforme / ❌ No Conforme)
- **Resumen de Resultados:**
  - Total de pruebas
  - Pruebas conformes
  - Pruebas no conformes
  - Porcentaje de éxito
- **Acciones:**
  - Botón "Aprobar para Producción" (verde)
  - Botón "Rechazar Idea" (rojo)
  - Campo de comentarios para la decisión
  - Botón "Solicitar Más Información"

**Flujo:**
1. SupervisorQA recibe notificación de idea con pruebas completadas
2. Accede a la pantalla de revisión
3. Revisa toda la información
4. Toma decisión: Aprobar o Rechazar
5. Sistema registra decisión y notifica al analista

---

### 3.8 Gestión de Materiales e Inventario

#### **3.8.1 Lista de Materiales**

**Descripción**

Muestra todos los materiales (materias primas) disponibles en el inventario que pueden ser utilizados en formulaciones.

**Elementos Principales:**
- Barra de búsqueda
- Filtros por categoría, estado
- Tabla de materiales con columnas:
  - ID
  - Nombre
  - Categoría
  - Cantidad disponible
  - Unidad
  - Estado
  - Acciones (Ver, Editar)
- Botón "Agregar Material"
- Vista de disponibilidad

---

#### **3.8.2 Detalles de Material**

**Descripción**

Vista detallada de un material con toda su información y disponibilidad.

**Elementos Principales:**
- Información del material
- Categoría
- Cantidad disponible
- Unidad de medida
- Estado (Activo, Inactivo, En Cuarentena)
- Historial de uso en formulaciones
- Botón "Editar Material"

---

### 3.9 Configuración y Administración

#### **3.9.1 Gestión de Usuarios (Solo Administrador)**

**Descripción**

Permite al administrador gestionar usuarios del sistema, crear nuevos usuarios y asignar roles.

**Elementos Principales:**
- Lista de usuarios
- Filtros por rol, estado
- Tabla de usuarios con columnas:
  - Nombre
  - Email
  - Rol
  - Estado
  - Último acceso
  - Acciones (Editar, Desactivar)
- Botón "Crear Nuevo Usuario"
- Formulario de creación/edición

---

#### **3.9.2 Perfil de Usuario**

**Descripción**

Permite a cualquier usuario ver y editar su información personal.

**Elementos Principales:**
- Información personal
- Email
- Rol actual
- Cambiar contraseña
- Preferencias de notificaciones
- Botón "Guardar Cambios"

---

## 4. Consideraciones de Diseño

### **4.1 Principios de Diseño**

- ✅ **Consistencia Visual**: Uso de colores consistentes para estados (GENERADA, EN_PRUEBA, APROBADA, RECHAZADA)
- ✅ **Feedback Visual**: Indicadores claros de acciones realizadas y estados del sistema
- ✅ **Jerarquía Visual**: Información más importante destacada visualmente
- ✅ **Accesibilidad**: Cumplimiento con estándares WCAG 2.1
- ✅ **Responsive Design**: Adaptación a diferentes tamaños de pantalla (desktop, tablet, móvil)

### **4.2 Paleta de Colores Sugerida**

- **Primario**: Azul corporativo (#2563EB)
- **Secundario**: Verde para aprobaciones (#10B981)
- **Advertencia**: Amarillo para en proceso (#F59E0B)
- **Error**: Rojo para rechazos (#EF4444)
- **Neutro**: Grises para fondos y textos (#6B7280)

### **4.3 Estados Visuales**

- 🟡 **GENERADA**: Amarillo - Idea creada, pendiente de asignación
- 🔵 **EN_PRUEBA**: Azul - Idea en desarrollo y pruebas
- 🟢 **APROBADA**: Verde - Idea aprobada para producción
- 🔴 **RECHAZADA**: Rojo - Idea rechazada

---

## 5. Notas para Desarrollo Frontend

### **5.1 Tecnologías Recomendadas**

- **Framework**: React 18 con Vite
- **Estilos**: Tailwind CSS
- **Navegación**: React Router
- **Estado**: Context API o Redux
- **Formularios**: React Hook Form
- **Validación**: Yup o Zod
- **PWA**: Service Workers para funcionalidad offline

### **5.2 Componentes Reutilizables**

- Botones con variantes (primary, secondary, danger, success)
- Tarjetas de información
- Tablas con paginación y filtros
- Modales para confirmaciones
- Formularios con validación
- Indicadores de estado
- Notificaciones/toasts

### **5.3 Consideraciones de Rendimiento**

- Lazy loading de módulos
- Paginación en listas grandes
- Debounce en búsquedas
- Caché de datos frecuentes
- Optimización de imágenes

---

**Fin del Documento**

