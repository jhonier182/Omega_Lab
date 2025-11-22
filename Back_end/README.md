# Backend PLM/LIMS - Proscience Lab

Backend desarrollado con Node.js, Express y Sequelize ORM siguiendo principios de código limpio y arquitectura simplificada.

## 🏗️ Arquitectura Simplificada

### Estructura (Modelo → Servicio → Controlador)

```
Back_end/
├── src/
│   ├── config/          # Configuración (Sequelize, JWT)
│   ├── models/          # Modelos Sequelize (con toda la lógica de acceso a datos)
│   ├── services/        # Lógica de negocio
│   ├── controllers/     # Controladores (orquestación)
│   ├── middleware/      # Middleware (auth, validation, security)
│   ├── routes/          # Definición de rutas
│   ├── utils/           # Utilidades (errores, helpers)
│   └── server.js        # Punto de entrada
└── database/            # Scripts SQL (opcional, Sequelize crea las tablas)
```

## 📋 Principios Aplicados

### 1. **Arquitectura Simplificada**
- **Modelos**: Sequelize ORM con toda la lógica de acceso a datos
- **Servicios**: Contienen lógica de negocio
- **Controladores**: Solo orquestan, delegan a servicios

### 2. **Sequelize ORM**
- Sincronización automática de tablas al iniciar
- Migraciones automáticas (alter en desarrollo)
- Asociaciones definidas entre modelos
- Validaciones a nivel de modelo

### 3. **Código Limpio**
- Nombres descriptivos
- Funciones pequeñas y enfocadas
- Comentarios JSDoc
- Manejo de errores consistente

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar servidor en desarrollo
npm run dev

# Iniciar servidor en producción
npm start
```

## 🔧 Configuración

### Variables de Entorno (.env)

```env
PORT=3001
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=1234
DB_NAME=plm_lims_db

JWT_SECRET=tu_secret_key_super_segura
JWT_EXPIRES_IN=24h

CORS_ORIGIN=http://localhost:3000
```

## 📡 Endpoints

### Autenticación

- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil (requiere autenticación)

### Productos y BOM

- `POST /api/products` - Crear producto
- `GET /api/products` - Listar productos (con filtros)
- `GET /api/products/:id` - Obtener producto con BOM
- `PUT /api/products/:id` - Actualizar producto
- `POST /api/products/:id/bom` - Crear/actualizar BOM
- `POST /api/products/boms/:bomId/items` - Agregar material al BOM
- `GET /api/products/boms/:bomId` - Obtener BOM con items
- `PUT /api/products/bom-items/:itemId` - Actualizar item
- `DELETE /api/products/bom-items/:itemId` - Eliminar item
- `GET /api/products/:id/bom/history` - Historial de versiones

## 🔄 Sincronización Automática de Tablas

**Sequelize sincroniza automáticamente las tablas al iniciar el servidor:**

- En **desarrollo**: Usa `alter: true` - actualiza las tablas sin eliminar datos
- En **producción**: Usa `alter: false` - solo crea si no existen

**Las tablas se crean/actualizan automáticamente según los modelos definidos.**

## 📝 Modelos Definidos

1. **User** - Usuarios del sistema
2. **Product** - Productos (terminados, materias primas, componentes)
3. **BOM** - Lista de Materiales
4. **BOMItem** - Items de la lista de materiales

## 🔐 Seguridad

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configuración de origen cruzado
- **Rate Limiting**: Prevención de ataques de fuerza bruta
- **JWT**: Autenticación basada en tokens
- **Bcrypt**: Hash de contraseñas
- **Validación**: Express-validator para validar inputs

## 🧪 Testing

Para probar los endpoints, puedes usar:

- **Postman**
- **cURL**
- **Thunder Client** (VS Code)

### Ejemplo con cURL

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@proscience.com","password":"admin123"}'

# Crear Producto
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"codigo":"PROD-001","nombre":"Vitamina D3","tipo":"producto_terminado"}'
```

## 📝 Notas de Desarrollo

### Flujo de una Request

1. **Request** → Middleware de seguridad (helmet, cors)
2. **Rate Limiting** → Limita requests por IP
3. **Routes** → Define el endpoint
4. **Validation Middleware** → Valida datos de entrada
5. **Auth Middleware** → Verifica autenticación (si aplica)
6. **Controller** → Orquesta la lógica
7. **Service** → Ejecuta lógica de negocio usando modelos Sequelize
8. **Model** → Sequelize maneja el acceso a datos
9. **Response** → Retorna resultado
10. **Error Handler** → Maneja errores

### Agregar Nuevos Endpoints

1. Crear modelo en `models/` (si es necesario)
2. Crear servicio en `services/`
3. Crear controlador en `controllers/`
4. Crear rutas en `routes/`
5. Agregar validaciones en `middleware/validation.js`

## 🔄 Próximos Pasos

- [ ] Agregar tests unitarios
- [ ] Agregar tests de integración
- [ ] Implementar refresh tokens
- [ ] Agregar logging estructurado
- [ ] Implementar cache (Redis)
- [ ] Agregar documentación con Swagger

## 📄 Licencia

Propietario - Proscience Lab
