import express from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';

const router = express.Router();

/**
 * Rutas principales de la API
 * Agrupa todas las rutas por recurso
 */

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de productos y BOM
router.use('/products', productRoutes);

export default router;

