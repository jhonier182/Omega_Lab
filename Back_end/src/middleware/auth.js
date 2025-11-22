import { verifyToken, extractTokenFromHeader } from '../config/jwt.js';
import { AppError } from '../utils/errors.js';
import { User } from '../models/User.js';

/**
 * Middleware de autenticación
 * Verifica que el usuario esté autenticado y agrega el usuario al request
 */
export const authenticate = async (req, res, next) => {
  try {
    // Extraer token del header
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      throw new AppError('Token de autenticación requerido', 401);
    }

    // Verificar token
    const decoded = verifyToken(token);

    // Verificar que el usuario existe y está activo
    const user = await User.findOne({
      where: {
        id: decoded.id,
        estado: 'activo'
      }
    });

    if (!user) {
      throw new AppError('Usuario no encontrado', 401);
    }

    // Agregar usuario al request (sin password)
    const userData = user.toJSON();
    delete userData.password;
    req.user = userData;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError('Token inválido o expirado', 401));
    }
  }
};

/**
 * Middleware para verificar roles
 * @param {Array<string>} allowedRoles - Roles permitidos
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Usuario no autenticado', 401));
    }

    if (!allowedRoles.includes(req.user.rol)) {
      return next(new AppError('No tienes permisos para acceder a este recurso', 403));
    }

    next();
  };
};

