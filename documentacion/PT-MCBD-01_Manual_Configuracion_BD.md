# 📊 Manual de Configuración de Base de Datos
## Proscience Lab - Sistema PLM/LIMS
**Versión:** 1.0

---

## 📋 Historial de Revisión

| Versión | Fecha Elaboración | Responsable Elaboración | Fecha Aprobación | Responsable Aprobación |
| --- | --- | --- | --- | --- |
| 1.0 | dd/mm/aaaa | Nombre del Responsable | dd/mm/aaaa | Nombre del Aprobador |

---

## 📝 Cambios Respecto a la Versión Anterior

| **Versión** | **Modificación Respecto Versión Anterior** |
| --- | --- |
| 1.0 | Documento inicial - Base de datos normalizada (3NF) |

---

## 📑 Tabla de Contenido

1. [Introducción](#1-introducción)
2. [Alcance](#2-alcance)
3. [Modelo Entidad Relación (MER)](#3-modelo-entidad-relación-mer)
4. [Diccionario de Datos](#4-diccionario-de-datos)
5. [Modelo Relacional o Estructura de Documentos](#5-modelo-relacional-o-estructura-de-documentos)
6. [Justificación Sistema gestor de bases de datos seleccionado](#6-justificación-sistema-gestor-de-bases-de-datos-seleccionado)
7. [Requisitos de configuración](#7-requisitos-de-configuración)
8. [Scripts](#8-scripts)
9. [Configuración y ejecución de la base de datos](#9-configuración-y-ejecución-de-la-base-de-datos)
10. [Otras consideraciones](#10-otras-consideraciones)

---

## 1. Introducción

Este documento describe la configuración y estructura de la base de datos para el sistema **Proscience Lab - PLM/LIMS** (Product Lifecycle Management / Laboratory Information Management System).

> 💡 **Nota importante:** El sistema está diseñado para gestionar el ciclo de vida de productos nutracéuticos, desde la generación de ideas hasta la producción, incluyendo la gestión de materiales, BOMs (Bill of Materials), pruebas de laboratorio y trazabilidad completa.

La base de datos ha sido diseñada siguiendo principios de normalización (3NF) para garantizar la integridad de los datos, eliminar redundancias y facilitar el mantenimiento.

---

## 2. Alcance

Este manual cubre los aspectos necesarios para configurar la base de datos del proyecto **Proscience Lab - PLM/LIMS**. Incluye:

- ✅ **Creación y configuración de la base de datos**
- ✅ **Definición del modelo entidad-relación y estructura de datos**
- ✅ **Requisitos y justificación del sistema gestor de bases de datos (SGBD) seleccionado**
- ✅ **Instrucciones para la instalación y configuración del SGBD**
- ✅ **Diccionario completo de datos con todas las tablas y campos**
- ✅ **Scripts SQL para creación y configuración inicial**

Este documento aplica a todas las fases de desarrollo y despliegue de la base de datos para el proyecto.

---

## 3. Modelo Entidad Relación (MER)

El diagrama MER se encuentra en el archivo `diagrama_base_datos_normalizada.puml` en formato PlantUML.

### Características del Modelo

- **9 tablas principales:** usuarios, categorias, productos, materiales, boms, bom_items, ideas, pruebas, resultados_prueba
- **Relaciones normalizadas:** Todas las categorías se gestionan a través de la tabla `categorias` mediante claves foráneas
- **Integridad referencial:** Todas las relaciones están definidas con constraints de integridad

### Características Principales

- ✅ Base de datos normalizada en **3NF (Tercera Forma Normal)**
- ✅ Eliminación de redundancias (campos `categoria` eliminados, uso de FK a `categorias`)
- ✅ Gestión de versiones de BOMs
- ✅ Trazabilidad completa de ideas y pruebas
- ✅ Control de estados y flujos de trabajo

---

## 4. Diccionario de Datos

El diccionario de datos proporciona una descripción completa de cada tabla y campo en la base de datos.

---

### 1. Tabla: `usuarios`

**Descripción:** Tabla que almacena la información de los usuarios del sistema con sus roles y estados.

| Campo | Tipo de Datos | Descripción |
| --- | --- | --- |
| `id` | `INT` (AUTO_INCREMENT, PRIMARY KEY) | Identificador único del usuario. Auto-incremental. |
| `email` | `VARCHAR(255)` (UNIQUE, NOT NULL) | Correo electrónico del usuario. Debe ser único. |
| `password` | `VARCHAR(255)` (NOT NULL) | Contraseña del usuario (encriptada con BCrypt). |
| `nombre` | `VARCHAR(255)` (NOT NULL) | Nombre completo del usuario. |
| `rol` | `ENUM('administrador', 'supervisor_qa', 'supervisor_calidad', 'analista_laboratorio')` | Rol del usuario en el sistema. |
| `estado` | `ENUM('activo', 'inactivo')` (DEFAULT 'activo') | Estado del usuario en el sistema. |
| `created_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP) | Fecha y hora de creación del registro. |
| `updated_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) | Fecha y hora de última actualización. |

**Índices:**
- `idx_email`: Índice sobre el campo email para búsquedas rápidas
- `idx_estado`: Índice sobre el campo estado para filtros

---

### 2. Tabla: `categorias`

**Descripción:** Tabla central que almacena las categorías de productos, materiales e ideas. Base de la normalización del sistema.

| Campo | Tipo de Datos | Descripción |
| --- | --- | --- |
| `id` | `INT` (AUTO_INCREMENT, PRIMARY KEY) | Identificador único de la categoría. |
| `nombre` | `VARCHAR(100)` (UNIQUE, NOT NULL) | Nombre de la categoría. Debe ser único. |
| `descripcion` | `TEXT` | Descripción detallada de la categoría. |
| `tipo_producto` | `ENUM('producto_terminado', 'materia_prima', 'componente')` (NOT NULL) | Tipo de producto al que aplica la categoría. |
| `estado` | `ENUM('activo', 'inactivo')` (DEFAULT 'activo') | Estado de la categoría. |
| `created_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP) | Fecha y hora de creación. |
| `updated_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) | Fecha y hora de última actualización. |

**Índices:**
- `idx_nombre`: Índice sobre el nombre para búsquedas
- `idx_tipo_producto`: Índice sobre el tipo de producto
- `idx_estado`: Índice sobre el estado
- `uk_nombre`: Constraint único sobre el nombre

---

### 3. Tabla: `productos`

**Descripción:** Tabla que almacena los productos terminados del inventario.

| Campo | Tipo de Datos | Descripción |
| --- | --- | --- |
| `id` | `INT` (AUTO_INCREMENT, PRIMARY KEY) | Identificador único del producto. |
| `codigo` | `VARCHAR(100)` (UNIQUE, NOT NULL) | Código único del producto. |
| `nombre` | `VARCHAR(255)` (NOT NULL) | Nombre del producto. |
| `descripcion` | `TEXT` | Descripción detallada del producto. |
| `categoria_id` | `INT` (FOREIGN KEY → categorias.id) | Referencia a la categoría del producto. Puede ser NULL. |
| `unidad_medida` | `VARCHAR(50)` (DEFAULT 'un') | Unidad de medida del producto. |
| `estado` | `ENUM('activo', 'inactivo')` (DEFAULT 'activo') | Estado del producto. |
| `created_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP) | Fecha y hora de creación. |
| `updated_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) | Fecha y hora de última actualización. |

**Índices:**
- `idx_codigo`: Índice sobre el código para búsquedas
- `idx_categoria_id`: Índice sobre la categoría (FK)
- `idx_estado`: Índice sobre el estado
- `uk_codigo`: Constraint único sobre el código

**Relaciones:**
- `fk_producto_categoria`: Foreign key a `categorias(id)` con `ON DELETE SET NULL`

---

### 4. Tabla: `materiales`

**Descripción:** Tabla que almacena las materias primas utilizadas en la fabricación de productos.

| Campo | Tipo de Datos | Descripción |
| --- | --- | --- |
| `id` | `INT` (AUTO_INCREMENT, PRIMARY KEY) | Identificador único del material. |
| `codigo` | `VARCHAR(100)` (UNIQUE, NOT NULL) | Código único del material. |
| `nombre` | `VARCHAR(255)` (NOT NULL) | Nombre del material. |
| `descripcion` | `TEXT` | Descripción detallada del material. |
| `categoria_id` | `INT` (FOREIGN KEY → categorias.id) | Referencia a la categoría del material. Puede ser NULL. |
| `unidad_medida` | `VARCHAR(50)` (DEFAULT 'kg') | Unidad de medida del material. |
| `estado` | `ENUM('activo', 'inactivo')` (DEFAULT 'activo') | Estado del material. |
| `created_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP) | Fecha y hora de creación. |
| `updated_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) | Fecha y hora de última actualización. |

**Índices:**
- `idx_codigo`: Índice sobre el código
- `idx_categoria_id`: Índice sobre la categoría (FK)
- `idx_estado`: Índice sobre el estado
- `uk_codigo`: Constraint único sobre el código

**Relaciones:**
- `fk_material_categoria`: Foreign key a `categorias(id)` con `ON DELETE SET NULL`

---

### 5. Tabla: `boms`

**Descripción:** Tabla que almacena las versiones de las listas de materiales (Bill of Materials) para cada producto.

| Campo | Tipo de Datos | Descripción |
| --- | --- | --- |
| `id` | `INT` (AUTO_INCREMENT, PRIMARY KEY) | Identificador único del BOM. |
| `producto_id` | `INT` (FOREIGN KEY → productos.id, NOT NULL) | Referencia al producto al que pertenece el BOM. |
| `version` | `VARCHAR(20)` (NOT NULL) | Versión del BOM (ej: "1.0", "2.1"). |
| `estado` | `ENUM('borrador', 'aprobado', 'obsoleto')` (DEFAULT 'borrador') | Estado del BOM. |
| `justificacion` | `TEXT` | Justificación de cambios en el BOM. |
| `created_by` | `INT` (FOREIGN KEY → usuarios.id) | Usuario que creó el BOM. |
| `approved_by` | `INT` (FOREIGN KEY → usuarios.id) | Usuario que aprobó el BOM. |
| `approved_at` | `TIMESTAMP` (NULL) | Fecha y hora de aprobación. |
| `created_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP) | Fecha y hora de creación. |
| `updated_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) | Fecha y hora de última actualización. |

**Índices:**
- `idx_producto_id`: Índice sobre el producto (FK)
- `idx_estado`: Índice sobre el estado
- `idx_version`: Índice sobre la versión
- `uk_producto_version`: Constraint único sobre (producto_id, version)

**Relaciones:**
- `fk_bom_producto`: Foreign key a `productos(id)` con `ON DELETE CASCADE`
- `fk_bom_creador`: Foreign key a `usuarios(id)` con `ON DELETE SET NULL`
- `fk_bom_aprobador`: Foreign key a `usuarios(id)` con `ON DELETE SET NULL`

---

### 6. Tabla: `bom_items`

**Descripción:** Tabla que almacena los items (materiales) que componen cada BOM.

| Campo | Tipo de Datos | Descripción |
| --- | --- | --- |
| `id` | `INT` (AUTO_INCREMENT, PRIMARY KEY) | Identificador único del item. |
| `bom_id` | `INT` (FOREIGN KEY → boms.id, NOT NULL) | Referencia al BOM al que pertenece. |
| `material_id` | `INT` (FOREIGN KEY → materiales.id, NOT NULL) | Referencia al material. |
| `cantidad` | `DECIMAL(15,4)` (NOT NULL) | Cantidad del material requerida. |
| `unidad` | `VARCHAR(50)` (DEFAULT 'mg') | Unidad de medida de la cantidad. |
| `porcentaje` | `DECIMAL(5,2)` (DEFAULT 0.00) | Porcentaje del material en la fórmula. |
| `secuencia` | `INT` (DEFAULT 0) | Orden de secuencia del material en el BOM. |
| `created_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP) | Fecha y hora de creación. |

**Índices:**
- `idx_bom_id`: Índice sobre el BOM (FK)
- `idx_material_id`: Índice sobre el material (FK)
- `idx_secuencia`: Índice sobre la secuencia

**Relaciones:**
- `fk_bom_item_bom`: Foreign key a `boms(id)` con `ON DELETE CASCADE`
- `fk_bom_item_material`: Foreign key a `materiales(id)` con `ON DELETE CASCADE`

---

### 7. Tabla: `ideas`

**Descripción:** Tabla que almacena las ideas de nuevos productos generadas por usuarios o por IA.

| Campo | Tipo de Datos | Descripción |
| --- | --- | --- |
| `id` | `INT` (AUTO_INCREMENT, PRIMARY KEY) | Identificador único de la idea. |
| `titulo` | `VARCHAR(255)` (NOT NULL) | Título de la idea. |
| `descripcion` | `TEXT` | Descripción detallada de la idea. |
| `detalles_ia` | `LONGTEXT` | Respuesta completa de la IA con BOM modificado, escenarios, etc. |
| `pruebas_requeridas` | `TEXT` | Lista de pruebas requeridas generadas por la IA. |
| `categoria_id` | `INT` (FOREIGN KEY → categorias.id) | Referencia a la categoría de la idea. |
| `prioridad` | `VARCHAR(20)` | Prioridad de la idea (ej: "Alta", "Media", "Baja"). |
| `objetivo` | `TEXT` | Objetivo de la idea (ej: "quiero crear una proteína para diabéticos"). |
| `producto_origen_id` | `INT` (FOREIGN KEY → productos.id) | Producto del inventario que se analizó para generar la idea. |
| `asignado_a` | `INT` (FOREIGN KEY → usuarios.id) | Analista asignado para pruebas. |
| `estado` | `ENUM('generada', 'en_revision', 'aprobada', 'en_prueba', 'prueba_aprobada', 'rechazada', 'en_produccion')` (DEFAULT 'generada') | Estado actual de la idea en el flujo de trabajo. |
| `created_by` | `INT` (FOREIGN KEY → usuarios.id) | Usuario que creó la idea. |
| `approved_by` | `INT` (FOREIGN KEY → usuarios.id) | Usuario que aprobó la idea. |
| `approved_at` | `TIMESTAMP` (NULL) | Fecha y hora de aprobación. |
| `created_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP) | Fecha y hora de creación. |
| `updated_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) | Fecha y hora de última actualización. |

**Índices:**
- `idx_estado`: Índice sobre el estado
- `idx_categoria_id`: Índice sobre la categoría (FK)
- `idx_prioridad`: Índice sobre la prioridad
- `idx_created_by`: Índice sobre el creador (FK)
- `idx_producto_origen_id`: Índice sobre el producto origen (FK)
- `idx_asignado_a`: Índice sobre el asignado (FK)

**Relaciones:**
- `fk_idea_creador`: Foreign key a `usuarios(id)` con `ON DELETE SET NULL`
- `fk_idea_aprobador`: Foreign key a `usuarios(id)` con `ON DELETE SET NULL`
- `fk_idea_producto_origen`: Foreign key a `productos(id)` con `ON DELETE SET NULL`
- `fk_idea_asignado`: Foreign key a `usuarios(id)` con `ON DELETE SET NULL`
- `fk_idea_categoria`: Foreign key a `categorias(id)` con `ON DELETE SET NULL`

---

### 8. Tabla: `pruebas`

**Descripción:** Tabla que almacena las pruebas de laboratorio realizadas sobre las ideas.

| Campo | Tipo de Datos | Descripción |
| --- | --- | --- |
| `id` | `INT` (AUTO_INCREMENT, PRIMARY KEY) | Identificador único de la prueba. |
| `idea_id` | `INT` (FOREIGN KEY → ideas.id, NOT NULL) | Referencia a la idea asociada. |
| `codigo_muestra` | `VARCHAR(100)` (NOT NULL) | Código único de la muestra. |
| `tipo_prueba` | `VARCHAR(100)` (NOT NULL) | Tipo de prueba realizada. |
| `descripcion` | `TEXT` | Descripción de la prueba. |
| `estado` | `ENUM('pendiente', 'en_proceso', 'completada', 'oos', 'rechazada')` (DEFAULT 'pendiente') | Estado actual de la prueba. |
| `fecha_muestreo` | `TIMESTAMP` (NULL) | Fecha y hora del muestreo. |
| `fecha_inicio` | `TIMESTAMP` (NULL) | Fecha y hora de inicio de la prueba. |
| `fecha_fin` | `TIMESTAMP` (NULL) | Fecha y hora de finalización de la prueba. |
| `resultado` | `TEXT` | Resultado general de la prueba. |
| `observaciones` | `TEXT` | Observaciones adicionales. |
| `equipos_utilizados` | `TEXT` | Equipos utilizados en la prueba. |
| `pruebas_requeridas` | `TEXT` | Lista de pruebas requeridas. |
| `analista_id` | `INT` (FOREIGN KEY → usuarios.id, NOT NULL) | Analista que realiza la prueba. |
| `created_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP) | Fecha y hora de creación. |
| `updated_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) | Fecha y hora de última actualización. |

**Índices:**
- `idx_idea_id`: Índice sobre la idea (FK)
- `idx_analista_id`: Índice sobre el analista (FK)
- `idx_estado`: Índice sobre el estado
- `idx_codigo_muestra`: Índice sobre el código de muestra

**Relaciones:**
- `fk_prueba_idea`: Foreign key a `ideas(id)` con `ON DELETE CASCADE`
- `fk_prueba_analista`: Foreign key a `usuarios(id)` con `ON DELETE CASCADE`

---

### 9. Tabla: `resultados_prueba`

**Descripción:** Tabla que almacena los resultados analíticos detallados de cada prueba.

| Campo | Tipo de Datos | Descripción |
| --- | --- | --- |
| `id` | `INT` (AUTO_INCREMENT, PRIMARY KEY) | Identificador único del resultado. |
| `prueba_id` | `INT` (FOREIGN KEY → pruebas.id, NOT NULL) | Referencia a la prueba asociada. |
| `parametro` | `VARCHAR(255)` (NOT NULL) | Nombre del parámetro analizado. |
| `especificacion` | `VARCHAR(255)` | Especificación o rango esperado del parámetro. |
| `resultado` | `VARCHAR(255)` (NOT NULL) | Valor del resultado obtenido. |
| `unidad` | `VARCHAR(50)` | Unidad de medida del resultado. |
| `cumple_especificacion` | `BOOLEAN` (DEFAULT TRUE) | Indica si el resultado cumple con la especificación. |
| `observaciones` | `TEXT` | Observaciones adicionales sobre el resultado. |
| `created_at` | `TIMESTAMP` (DEFAULT CURRENT_TIMESTAMP) | Fecha y hora de creación. |

**Índices:**
- `idx_prueba_id`: Índice sobre la prueba (FK)

**Relaciones:**
- `fk_resultado_prueba`: Foreign key a `pruebas(id)` con `ON DELETE CASCADE`

---

## 5. Modelo Relacional o Estructura de Documentos

La base de datos utiliza un modelo relacional normalizado. A continuación se describen las relaciones principales:

### Relaciones Uno a Muchos (1:N)

1. **categorias → productos**: Una categoría puede tener muchos productos
2. **categorias → materiales**: Una categoría puede tener muchos materiales
3. **categorias → ideas**: Una categoría puede tener muchas ideas
4. **productos → boms**: Un producto puede tener muchas versiones de BOM
5. **productos → ideas**: Un producto puede ser origen de muchas ideas
6. **boms → bom_items**: Un BOM puede tener muchos items
7. **materiales → bom_items**: Un material puede estar en muchos BOMs
8. **usuarios → boms**: Un usuario puede crear/aprobar muchos BOMs
9. **usuarios → ideas**: Un usuario puede crear/aprobar/asignar muchas ideas
10. **usuarios → pruebas**: Un usuario (analista) puede realizar muchas pruebas
11. **ideas → pruebas**: Una idea puede tener muchas pruebas
12. **pruebas → resultados_prueba**: Una prueba puede tener muchos resultados

### Normalización Aplicada

La base de datos está normalizada en **3NF (Tercera Forma Normal)**:

> ✅ **Eliminación de redundancias:** Los campos `categoria` (VARCHAR) fueron eliminados de las tablas `productos`, `materiales` e `ideas`, siendo reemplazados por `categoria_id` (FK) que referencia a la tabla `categorias`.

> ✅ **Integridad referencial:** Todas las relaciones están definidas con foreign keys y acciones de cascada apropiadas.

> ✅ **Consistencia de datos:** La información de categorías se centraliza en una sola tabla, evitando inconsistencias.

---

## 6. Justificación Sistema gestor de bases de datos seleccionado

**Sistema Gestor de Bases de Datos Seleccionado:** MySQL 8.0

### Justificación

- ✅ **Escalabilidad:** MySQL permite manejar grandes volúmenes de datos y escalar con facilidad, adecuado para el crecimiento del inventario y las pruebas de laboratorio
- ✅ **Costo:** MySQL es una solución de código abierto con opciones comerciales, adecuada para proyectos de distintos tamaños
- ✅ **Rendimiento:** Ofrece un alto rendimiento en transacciones y consultas, esencial para operaciones de laboratorio en tiempo real
- ✅ **Comunidad:** Amplio soporte y documentación a través de una comunidad activa
- ✅ **Compatibilidad:** Excelente integración con frameworks Java/Spring Boot utilizados en el proyecto
- ✅ **Características avanzadas:** Soporte para JSON, índices full-text, y transacciones ACID
- ✅ **Replicación y respaldo:** Facilidades para replicación y respaldo de datos críticos de laboratorio

### Comparación con Otros SGBD

| **SGBD** | **Escalabilidad** | **Costo** | **Rendimiento** | **Soporte** | **Integración Java** |
| --- | --- | --- | --- | --- | --- |
| MySQL | Alta | Gratuito / Comercial | Alto | Excelente | Excelente |
| PostgreSQL | Alta | Gratuito | Muy Alto | Excelente | Excelente |
| Oracle DB | Muy Alta | Comercial | Muy Alto | Excelente | Excelente |
| MongoDB | Alta | Gratuito / Comercial | Alto (NoSQL) | Bueno | Bueno |

---

## 7. Requisitos de Configuración

### Herramientas Necesarias

- **Motor de Base de Datos:** MySQL 8.0 o superior
- **Cliente de Base de Datos:** MySQL Workbench 8.0 o superior, o cliente de línea de comandos
- **Servidor:** Windows 10 o superior / Linux Ubuntu 20.04 o superior / macOS 10.15 o superior
- **Java:** JDK 17 o superior (para la aplicación Spring Boot)

### Configuración Recomendada

- **Puertos:** Usar el puerto por defecto 3306 para MySQL
- **Espacio en Disco:** Al menos 50 GB disponibles para datos, índices y copias de seguridad
- **Memoria RAM:** Mínimo 4 GB recomendado para el servidor MySQL
- **Charset:** UTF8MB4 para soporte completo de caracteres Unicode

### Variables de Entorno

```
MYSQL_HOST=localhost (por defecto)
MYSQL_PORT=3306 (por defecto)
MYSQL_DATABASE=proscience
MYSQL_USER=usuario con permisos de administración
MYSQL_PASSWORD=contraseña segura
```

---

## 8. Scripts

### Paso 1: Crear la Base de Datos

Primero, crea la base de datos `proscience` en MySQL:

```sql
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS proscience CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos creada
USE proscience;
```

### Paso 2: Ejecutar el Script Completo

El script completo de creación de tablas se encuentra en `backend_java/plm/src/main/resources/schema.sql`. Este script incluye:

1. ✅ **Creación de todas las tablas** con sus campos, tipos de datos y restricciones
2. ✅ **Definición de índices** para optimizar consultas
3. ✅ **Constraints de integridad referencial** (Foreign Keys)
4. ✅ **Configuración de charset UTF8MB4** para soporte completo de caracteres

> 📝 **Nota:** El script completo está disponible en el archivo `schema.sql` del proyecto. Se recomienda ejecutarlo completo para garantizar la creación correcta de todas las estructuras.

### Paso 3: Verificar la Configuración

1. **Abrir MySQL Workbench:** Conectarse al servidor MySQL
2. **Ejecutar el Script:** Copia y pega el script SQL desde `schema.sql` en una nueva pestaña de consulta y ejecútalo
3. **Verificar Tablas:** Ve a la pestaña "Schemas" y expande `proscience` para verificar que todas las tablas se hayan creado correctamente:
   - usuarios
   - categorias
   - productos
   - materiales
   - boms
   - bom_items
   - ideas
   - pruebas
   - resultados_prueba

4. **Consultar Estructura:** Ejecuta consultas para verificar la estructura:

```sql
-- Ver todas las tablas
SHOW TABLES;

-- Ver estructura de una tabla específica
DESCRIBE usuarios;
DESCRIBE categorias;
DESCRIBE productos;
DESCRIBE materiales;
DESCRIBE boms;
DESCRIBE bom_items;
DESCRIBE ideas;
DESCRIBE pruebas;
DESCRIBE resultados_prueba;

-- Verificar foreign keys
SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME
FROM
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
    REFERENCED_TABLE_SCHEMA = 'proscience'
    AND REFERENCED_TABLE_NAME IS NOT NULL;
```

---

## 9. Configuración y Ejecución de la Base de Datos

### Proceso de Instalación del SGBD

1. **Descargar e Instalar MySQL:**
   - Obtén el instalador desde el [sitio oficial de MySQL](https://dev.mysql.com/downloads/installer/)
   - Para Windows: Descarga MySQL Installer
   - Para Linux: Usa el gestor de paquetes: `sudo apt-get install mysql-server`
   - Para macOS: Usa Homebrew: `brew install mysql`

2. **Configurar MySQL:**
   - Sigue las instrucciones del instalador para configurar el puerto (3306 por defecto)
   - Establece una contraseña segura para el usuario root
   - Configura el servicio para iniciar automáticamente

3. **Verificar Instalación:**
   ```bash
   mysql --version
   ```

### Ejecución del Script

1. **Abrir MySQL Workbench:** Conéctate al servidor MySQL usando las credenciales configuradas
2. **Crear Base de Datos:** Ejecuta el script de creación de base de datos (Paso 1)
3. **Ejecutar Schema:** Ejecuta el script completo desde `schema.sql` en el editor SQL de MySQL Workbench
4. **Verificar:** Comprueba que todas las tablas se hayan creado correctamente

### Configuración de la Aplicación Spring Boot

El archivo `application.properties` debe contener:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/proscience?useSSL=false&serverTimezone=America/Bogota&allowPublicKeyRetrieval=true
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true
```

### Verificación

- ✅ **Comprobar Tablas:** Verifica que las 9 tablas se hayan creado correctamente
- ✅ **Consultar Datos:** La aplicación Spring Boot inicializará datos de ejemplo mediante `DataInitializer` si está configurado
- ✅ **Probar Conexión:** Ejecuta la aplicación Spring Boot y verifica que se conecte correctamente a la base de datos

---

## 10. Otras Consideraciones

### 🔒 Seguridad

- **Contraseñas:** Todas las contraseñas de usuarios deben estar encriptadas usando BCrypt antes de almacenarse
- **Conexiones:** En producción, usar conexiones SSL/TLS para la comunicación con la base de datos
- **Backups:** Implementar un sistema de respaldo automático de la base de datos
- **Permisos:** Limitar los permisos de los usuarios de la base de datos al mínimo necesario

### ⚡ Rendimiento

- **Índices:** Los índices están optimizados para las consultas más frecuentes. Revisar periódicamente el uso de índices
- **Conexiones:** Configurar un pool de conexiones apropiado en la aplicación (HikariCP por defecto en Spring Boot)
- **Consultas:** Monitorear consultas lentas y optimizarlas según sea necesario

### 🔧 Mantenimiento

- **Actualizaciones:** Mantener MySQL actualizado con las últimas versiones de seguridad
- **Logs:** Revisar periódicamente los logs de MySQL para detectar problemas
- **Espacio en Disco:** Monitorear el espacio en disco y planificar el crecimiento de datos

### 📦 Migraciones

- **Versionado:** El proyecto utiliza Hibernate para el mapeo ORM. Para cambios de esquema, considerar usar herramientas de migración como Flyway o Liquibase
- **Scripts de Migración:** Mantener un historial de scripts de migración para cambios futuros en el esquema

### 🔌 Uso de Puertos

- Asegúrate de que el puerto 3306 esté abierto y accesible para las conexiones
- En entornos de producción, considerar el uso de firewalls y restricciones de IP

### 📄 Archivos de Configuración

Ajusta los archivos `my.cnf` (Linux) o `my.ini` (Windows) para adaptarse a las necesidades del proyecto.

**Configuraciones recomendadas:**
- `max_connections`: 200
- `innodb_buffer_pool_size`: 1GB (ajustar según RAM disponible)
- `character-set-server`: utf8mb4
- `collation-server`: utf8mb4_unicode_ci

### 🌐 IP del Servidor

- Verifica que la IP del servidor de base de datos sea accesible desde las redes requeridas
- En desarrollo, `localhost` es suficiente
- En producción, configurar IPs específicas y restricciones de acceso

### 📊 Normalización

- La base de datos está normalizada en 3NF. Cualquier modificación futura debe mantener este nivel de normalización
- Evitar agregar campos redundantes que violen la normalización

---

**Fin del Documento**
