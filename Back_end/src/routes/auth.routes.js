import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * Rutas de autenticación
 * Separación clara de rutas por recurso
 */

// POST /api/auth/register
router.post('/register', validateRegister, AuthController.register);

// POST /api/auth/login
router.post('/login', validateLogin, AuthController.login);

// GET /api/auth/profile (requiere autenticación)
router.get('/profile', authenticate, AuthController.getProfile);

export default router;

