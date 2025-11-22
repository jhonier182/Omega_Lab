<!-- 1fd28f0a-1c8d-45c7-8d8d-85360d18a40b b64459c8-450d-4fe6-9b7b-6cacc3cae368 -->
# Plan de Migración: Backend Node.js a Spring Boot - Sistema PLM/LIMS

## Contexto del Sistema

### Descripción General

Sistema integral PLM/LIMS (Product Lifecycle Management / Laboratory Information Management System) para **Proscience Lab**, empresa colombiana de nutracéuticos y suplementos dietarios. El sistema está diseñado para cumplir con las **Buenas Prácticas de Manufactura (BPM)** establecidas en el **Decreto 3249 de 2006** del Ministerio de Salud y Protección Social de Colombia.

### Características Principales

- **Asistencia de IA en Formulación**: Sistema inteligente que sugiere combinaciones de productos del inventario para crear nuevas fórmulas
- **Gestión del Ciclo de Vida del Producto (PLM)**: Desde investigación hasta aprobación y liberación
- **Sistema de Información de Laboratorio (LIMS)**: Control de calidad, pruebas analíticas y gestión de muestras
- **Trazabilidad Completa**: Seguimiento de lotes desde materias primas hasta distribución
- **Integridad de Datos ALCOA+**: Registros inalterables con timestamps y firmas digitales
- **Control de Versiones**: Gestión de BOM (Bill of Materials) con historial completo
- **Cumplimiento Regulatorio**: Diseñado para facilitar auditorías del INVIMA

### Módulos del Sistema (Futuros)

El backend actual solo implementa **Autenticación** y **Gestión de Productos/BOM**. El sistema completo incluye:

1. Dashboard (KPIs, métricas, alertas)
2. Ideas/Research (integración con APIs moleculares: PubChem, ChEMBL, DrugBank, ZINC)
3. Formulación (con asistencia de IA)
4. IA/Simulación (predicción de propiedades, análisis de compatibilidad)
5. Producción (órdenes de lote, dispensación digital, line clearance)
6. Pruebas/Control de Calidad - LIMS (muestras, pruebas analíticas, OOS, calibración)
7. Aprobación/QA (firma digital, NC, CAPA, control de cambios)
8. Trazabilidad (trazabilidad hacia atrás/adelante, retiros del mercado)
9. Base de Conocimiento (SOPs, guías, farmacopeas, control de versiones)
10. Configuración (usuarios, roles, equipos, parámetros)

### Requisitos Regulatorios Críticos

- **Decreto 3249 de 2006 (BPM)**: Trazabilidad, documentación, control de calidad, validación de sistemas
- **Ley 1581 de 2012**: Protección de datos personales
- **Principios ALCOA+**: Attributable, Legible, Contemporaneous, Original, Accurate, Complete, Consistent, Enduring, Available
- **FDA 21 CFR Part 11**: Registros electrónicos y firmas electrónicas (referencia internacional)

### Roles de Usuario

- **Usuario**: Personal de producción básico
- **Analista**: Control de calidad, pruebas analíticas
- **Supervisor**: Supervisión de procesos operativos
- **QA Manager**: Aprobación y liberación de productos, gestión NC/CAPA
- **Administrador**: Acceso completo, gestión de usuarios y configuración

## Objetivo de la Migración

Migrar completamente el backend Node.js/Express a Java Spring Boot manteniendo toda la funcionalidad, endpoints, lógica de negocio y estructura de respuestas, **preparando la arquitectura para futuros módulos** del sistema PLM/LIMS completo.

## Estructura del Plan

### FASE 1: Configuración Base del Proyecto

#### 1.1 Actualizar dependencias en pom.xml

- Agregar spring-boot-starter-security
- Agregar spring-boot-starter-validation
- Agregar jjwt (JWT para Java)
- Agregar spring-boot-starter-actuator (para health check)
- Verificar versión de Spring Boot (actualizar si es necesario)
- Agregar bucket4j para rate limiting (opcional)

#### 1.2 Configurar application.properties

- Configuración de base de datos MySQL (url, username, password, driver)
- Configuración de JPA/Hibernate (dialect, ddl-auto, show-sql, format-sql)
- Configuración de pool de conexiones HikariCP
- Configuración de JWT (secret, expiration)
- Configuración de CORS (allowed-origins, allowed-methods, allowed-headers)
- Configuración de rate limiting
- Configuración de logging
- Configuración de servidor (port, context-path)

### FASE 2: Entidades JPA (Modelos)

#### 2.1 Crear Enums

- `Rol.java` - Enum para roles: USUARIO, ANALISTA, SUPERVISOR, QA_MANAGER, ADMIN
- `EstadoUsuario.java` - Enum: ACTIVO, INACTIVO
- `TipoProducto.java` - Enum: PRODUCTO_TERMINADO, MATERIA_PRIMA, COMPONENTE
- `EstadoBOM.java` - Enum: BORRADOR, APROBADO, OBSOLETO

#### 2.2 Entidad User (usuarios)

- Campos: id, email, password, nombre, rol (enum), estado (enum)
- Validaciones: @Email, @NotBlank, @NotNull
- Índices: email único, índice en estado
- Hooks: @PrePersist y @PreUpdate para hashear password
- Tabla: usuarios
- Timestamps: created_at, updated_at

#### 2.3 Entidad Product (productos)

- Campos: id, codigo, nombre, descripcion, categoria, tipo (enum), unidad_medida, estado
- Validaciones: @NotBlank en codigo y nombre, código único
- Índices: codigo único, índices en tipo, categoria, estado
- Tabla: productos
- Timestamps: created_at, updated_at
- Relación: @OneToMany con BOM

#### 2.4 Entidad BOM (listas de materiales)

- Campos: id, producto_id (FK), version, estado (enum), justificacion, created_by (FK), approved_by (FK), approved_at
- Validaciones: @NotBlank en version
- Índices: producto_id, estado, version, índice único compuesto (producto_id, version)
- Tabla: boms
- Timestamps: created_at, updated_at
- Relaciones:
- @ManyToOne con Product
- @ManyToOne con User (created_by)
- @ManyToOne con User (approved_by)
- @OneToMany con BOMItem

#### 2.5 Entidad BOMItem (items de BOM)

- Campos: id, bom_id (FK), material_id (FK), cantidad, unidad, porcentaje, secuencia
- Validaciones: @NotNull, @DecimalMin(0.0001) en cantidad, @Min(0) @Max(100) en porcentaje
- Índices: bom_id, material_id, secuencia
- Tabla: bom_items
- Timestamps: created_at (sin updated_at)
- Relaciones:
- @ManyToOne con BOM
- @ManyToOne con Product (material)

### FASE 3: Repositorios (Spring Data JPA)

#### 3.1 UserRepository

- Extiende JpaRepository<User, Integer>
- Métodos personalizados:
- findByEmail(String email)
- existsByEmail(String email)
- findByEmailAndEstado(String email, EstadoUsuario estado)

#### 3.2 ProductRepository

- Extiende JpaRepository<Product, Integer>
- Métodos personalizados:
- findByCodigo(String codigo)
- existsByCodigo(String codigo)
- findByTipoAndEstado(TipoProducto tipo, EstadoUsuario estado)
- findByCategoriaAndEstado(String categoria, EstadoUsuario estado)
- Buscar por nombre o código (usando @Query con LIKE)

#### 3.3 BOMRepository

- Extiende JpaRepository<BOM, Integer>
- Métodos personalizados:
- findByProductoId(Integer productoId)
- findByProductoIdAndEstado(Integer productoId, EstadoBOM estado)
- findByProductoIdOrderByVersionDesc(Integer productoId)
- existsByProductoIdAndVersion(Integer productoId, String version)

#### 3.4 BOMItemRepository

- Extiende JpaRepository<BOMItem, Integer>
- Métodos personalizados:
- findByBomId(Integer bomId)
- findByBomIdOrderBySecuenciaAsc(Integer bomId)
- findMaxSecuenciaByBomId(Integer bomId)

### FASE 4: DTOs (Data Transfer Objects)

#### 4.1 DTOs de Autenticación

- `RegisterRequest.java` - email, password, nombre, rol (opcional)
- `LoginRequest.java` - email, password
- `AuthResponse.java` - user (UserDTO), token
- `UserDTO.java` - id, email, nombre, rol, estado (sin password)

#### 4.2 DTOs de Productos

- `ProductRequest.java` - codigo, nombre, descripcion, categoria, tipo, unidad_medida
- `ProductResponse.java` - todos los campos de Product + BOM (opcional)
- `ProductListResponse.java` - lista de productos

#### 4.3 DTOs de BOM

- `BOMRequest.java` - justificacion
- `BOMResponse.java` - todos los campos de BOM + items
- `BOMItemRequest.java` - material_id, cantidad, unidad, porcentaje
- `BOMItemResponse.java` - todos los campos + información del material
- `BOMHistoryResponse.java` - lista de versiones de BOM

#### 4.4 DTOs de Respuesta Genérica

- `ApiResponse.java` - success, data, message (genérico para todas las respuestas)
- `ErrorResponse.java` - success, error (message, details)

### FASE 5: Servicios e Implementaciones

#### 5.1 AuthService y AuthServiceImpl

- `register(RegisterRequest)` - Valida email único, hashea password, crea usuario, genera token
- `login(LoginRequest)` - Valida credenciales, verifica password, genera token
- `getProfile(Integer userId)` - Obtiene perfil del usuario
- Métodos auxiliares: hashPassword, verifyPassword, userToDTO

#### 5.2 ProductService y ProductServiceImpl

- `createProduct(ProductRequest)` - Valida código único, crea producto
- `getAllProducts(String tipo, String categoria, String search)` - Lista con filtros
- `getProductById(Integer id)` - Obtiene producto con BOM (prioriza aprobado, luego borrador)
- `updateProduct(Integer id, ProductRequest)` - Actualiza producto, valida código único si cambia
- `createOrUpdateBOM(Integer productoId, BOMRequest, Integer userId)` - Crea o actualiza BOM en borrador
- `addMaterialToBOM(Integer bomId, BOMItemRequest)` - Agrega material, calcula secuencia
- `getBOMWithItems(Integer bomId)` - Obtiene BOM completo con items y materiales
- `updateBOMItem(Integer itemId, BOMItemRequest)` - Actualiza item
- `deleteBOMItem(Integer itemId)` - Elimina item
- `getBOMHistory(Integer productoId)` - Obtiene historial de versiones
- Métodos auxiliares: getNextVersion, calculateNextSequence

### FASE 6: Controladores REST

#### 6.1 AuthController

- POST `/api/auth/register` - Registro de usuario (@Valid RegisterRequest)
- POST `/api/auth/login` - Login (@Valid LoginRequest, rate limiting)
- GET `/api/auth/profile` - Perfil del usuario autenticado (@PreAuthorize)

#### 6.2 ProductController

- POST `/api/products` - Crear producto (@Valid ProductRequest, @PreAuthorize)
- GET `/api/products` - Listar productos (filtros: tipo, categoria, search, @PreAuthorize)
- GET `/api/products/{id}` - Obtener producto con BOM (@PreAuthorize)
- PUT `/api/products/{id}` - Actualizar producto (@Valid ProductRequest, @PreAuthorize)
- POST `/api/products/{id}/bom` - Crear/actualizar BOM (@Valid BOMRequest, @PreAuthorize)
- GET `/api/products/{id}/bom/history` - Historial de BOM (@PreAuthorize)
- POST `/api/products/boms/{bomId}/items` - Agregar material (@Valid BOMItemRequest, @PreAuthorize)
- GET `/api/products/boms/{bomId}` - Obtener BOM con items (@PreAuthorize)
- PUT `/api/products/bom-items/{itemId}` - Actualizar item (@Valid BOMItemRequest, @PreAuthorize)
- DELETE `/api/products/bom-items/{itemId}` - Eliminar item (@PreAuthorize)

#### 6.3 HealthController

- GET `/api/health` - Health check del sistema

### FASE 7: Seguridad y JWT

#### 7.1 JwtTokenProvider

- `generateToken(UserDetails)` - Genera JWT con id, email, rol
- `validateToken(String token)` - Valida y decodifica token
- `getUserIdFromToken(String token)` - Extrae userId del token
- `getRolesFromToken(String token)` - Extrae roles del token

#### 7.2 JwtAuthenticationFilter

- Filtro que intercepta requests
- Extrae token del header Authorization
- Valida token y carga UserDetails
- Establece SecurityContext

#### 7.3 SecurityConfig

- Configuración de Spring Security
- Deshabilitar CSRF (API REST)
- Configurar CORS
- Configurar rate limiting para /api/auth/login
- Configurar rate limiting general para /api/**
- Configurar filtro JWT
- Configurar autorización por roles
- Configurar BCryptPasswordEncoder

#### 7.4 UserDetailsService

- Implementación para cargar usuario desde BD
- Retorna UserDetails con roles

### FASE 8: Validaciones

#### 8.1 Validaciones en DTOs

- Usar anotaciones jakarta.validation:
- @NotNull, @NotBlank, @NotEmpty
- @Email, @Size, @Min, @Max
- @DecimalMin, @DecimalMax
- @Pattern (si es necesario)

#### 8.2 Validaciones personalizadas

- @ValidEmail (si es necesario)
- Validación de porcentajes en BOM (suma 100%)
- Validación de código único de producto

### FASE 9: Manejo de Excepciones

#### 9.1 Excepciones Personalizadas

- `AppException.java` - Excepción base con statusCode
- `ResourceNotFoundException.java` - 404
- `BadRequestException.java` - 400
- `UnauthorizedException.java` - 401
- `ForbiddenException.java` - 403
- `ConflictException.java` - 409 (email/código duplicado)

#### 9.2 GlobalExceptionHandler

- @ControllerAdvice para manejo global
- @ExceptionHandler para cada tipo de excepción
- Manejo de ValidationException (errores de @Valid)
- Manejo de MethodArgumentNotValidException
- Formato de respuesta consistente (ErrorResponse)

### FASE 10: Configuraciones Adicionales

#### 10.1 WebConfig

- Configuración de CORS
- Configuración de mensajes de validación
- Configuración de formato de fecha

#### 10.2 JPAConfig (si es necesario)

- Configuración adicional de JPA
- Auditoría (si se implementa)

### FASE 11: Utilidades y Helpers

#### 11.1 PasswordEncoder

- Bean de BCryptPasswordEncoder
- Configuración de strength (10 rounds)

#### 11.2 Mappers (opcional)

- UserMapper - Entity a DTO
- ProductMapper - Entity a DTO
- BOMMapper - Entity a DTO
- Usar MapStruct o manual

### FASE 12: Scripts y Utilidades

#### 12.1 DataInitializer (CommandLineRunner)

- Script para crear usuario admin inicial
- Similar a createAdmin.js de Node.js
- Verificar si existe antes de crear

#### 12.2 Database Migration (opcional)

- Usar Flyway o Liquibase
- Scripts SQL para migración de datos existentes

### FASE 13: Testing y Validación

#### 13.1 Tests Unitarios

- Tests de servicios
- Tests de repositorios
- Tests de utilidades

#### 13.2 Tests de Integración

- Tests de controladores
- Tests de seguridad
- Tests de endpoints completos

### FASE 14: Documentación

#### 14.1 README.md

- Instrucciones de configuración
- Variables de entorno
- Cómo ejecutar
- Endpoints disponibles

#### 14.2 Comentarios JavaDoc

- Documentar todas las clases públicas
- Documentar métodos importantes

## Consideraciones Importantes

1. **Mantener compatibilidad de endpoints**: Todos los endpoints deben mantener la misma ruta y estructura de respuesta
2. **Mantener lógica de negocio**: Toda la lógica debe ser idéntica (validaciones, cálculos, reglas)
3. **Mantener estructura de respuestas**: Formato {success: true, data: {...}} debe mantenerse
4. **Transacciones**: Usar @Transactional en métodos que modifican múltiples entidades
5. **Manejo de errores**: Mantener mismos códigos HTTP y mensajes
6. **Seguridad**: Implementar todas las medidas de seguridad (JWT, rate limiting, CORS)
7. **Validaciones**: Mantener todas las validaciones del backend original
8. **Hooks de password**: Implementar @PrePersist y @PreUpdate para hashear password automáticamente

## Archivos a Crear/Modificar

### Archivos de Configuración

- pom.xml (actualizar dependencias)
- application.properties (configuración completa)
- application-dev.properties (opcional)
- application-prod.properties (opcional)

### Entidades (4 archivos)

- User.java
- Product.java
- BOM.java
- BOMItem.java

### Enums (4 archivos)

- Rol.java
- EstadoUsuario.java
- TipoProducto.java
- EstadoBOM.java

### Repositorios (4 archivos)

- UserRepository.java
- ProductRepository.java
- BOMRepository.java
- BOMItemRepository.java

### DTOs (10+ archivos)

- RegisterRequest.java, LoginRequest.java, AuthResponse.java, UserDTO.java
- ProductRequest.java, ProductResponse.java
- BOMRequest.java, BOMResponse.java, BOMItemRequest.java, BOMItemResponse.java, BOMHistoryResponse.java
- ApiResponse.java, ErrorResponse.java

### Servicios (4 archivos)

- AuthService.java (interfaz)
- AuthServiceImpl.java
- ProductService.java (interfaz)
- ProductServiceImpl.java

### Controladores (3 archivos)

- AuthController.java
- ProductController.java
- HealthController.java

### Seguridad (4 archivos)

- JwtTokenProvider.java
- JwtAuthenticationFilter.java
- SecurityConfig.java
- UserDetailsServiceImpl.java

### Excepciones (6 archivos)

- AppException.java
- ResourceNotFoundException.java
- BadRequestException.java
- UnauthorizedException.java
- ForbiddenException.java
- ConflictException.java
- GlobalExceptionHandler.java

### Configuraciones (2 archivos)

- WebConfig.java
- JPAConfig.java (opcional)

### Utilidades (2 archivos)

- DataInitializer.java
- Mappers (opcional)

### Total: ~45-50 archivos Java + archivos de configuración

### To-dos

- [ ] Actualizar pom.xml con todas las dependencias necesarias (Spring Security, JWT, Validation, Actuator) y configurar application.properties completo
- [ ] Crear todos los enums: Rol, EstadoUsuario, TipoProducto, EstadoBOM
- [ ] Crear entidades JPA: User, Product, BOM, BOMItem con todas las relaciones, validaciones, índices y hooks (@PrePersist/@PreUpdate para password)
- [ ] Crear repositorios Spring Data JPA: UserRepository, ProductRepository, BOMRepository, BOMItemRepository con métodos personalizados
- [ ] Crear todos los DTOs: RegisterRequest, LoginRequest, AuthResponse, UserDTO, ProductRequest, ProductResponse, BOMRequest, BOMResponse, BOMItemRequest, BOMItemResponse, BOMHistoryResponse, ApiResponse, ErrorResponse
- [ ] Crear interfaces y implementaciones de servicios: AuthService/AuthServiceImpl, ProductService/ProductServiceImpl con toda la lógica de negocio
- [ ] Implementar seguridad JWT: JwtTokenProvider, JwtAuthenticationFilter, SecurityConfig, UserDetailsServiceImpl
- [ ] Crear controladores REST: AuthController, ProductController, HealthController con todos los endpoints y validaciones
- [ ] Crear excepciones personalizadas y GlobalExceptionHandler para manejo centralizado de errores
- [ ] Crear configuraciones adicionales: WebConfig (CORS), y utilidades como DataInitializer para crear admin inicial
- [ ] Implementar todas las validaciones con jakarta.validation en DTOs y validaciones personalizadas de negocio
- [ ] Crear tests unitarios y de integración para validar la migración completa