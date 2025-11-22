import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './utils/errors.js';
import { corsConfig, helmetConfig, apiLimiter } from './middleware/security.js';
import { loginLimiter } from './middleware/security.js';
import { initializeDatabase } from './config/sequelize.js';
import sequelize from './config/sequelize.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

/**
 * Middleware de seguridad
 */
app.use(helmetConfig);
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Rate limiting
 */
app.use('/api/', apiLimiter);
app.use('/api/auth/login', loginLimiter);

/**
 * Rutas de la API
 */
app.use('/api', routes);

/**
 * Manejo de errores
 * Debe ir al final, después de todas las rutas
 */
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Iniciar servidor
 */
const startServer = async () => {
  try {
    // Inicializar base de datos (conecta y sincroniza tablas)
    await initializeDatabase(false); // false = no elimina datos existentes

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📝 Entorno: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de cierre graceful
process.on('SIGTERM', async () => {
  console.log('SIGTERM recibido, cerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT recibido, cerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

startServer();

