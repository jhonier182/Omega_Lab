import { body, validationResult } from 'express-validator';
import { AppError } from '../utils/errors.js';

/**
 * Middleware para validar los resultados de express-validator
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    throw new AppError(errorMessages.join(', '), 400);
  }
  
  next();
};

/**
 * Reglas de validación para registro de usuario
 */
export const validateRegister = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email no es válido')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres'),
  
  body('rol')
    .optional()
    .isIn(['usuario', 'analista', 'supervisor', 'qa_manager', 'admin'])
    .withMessage('Rol inválido'),
  
  validate
];

/**
 * Reglas de validación para login
 */
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email no es válido')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida'),
  
  validate
];

/**
 * Reglas de validación para crear producto
 */
export const validateCreateProduct = [
  body('codigo')
    .trim()
    .notEmpty()
    .withMessage('El código del producto es requerido'),
  
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre del producto es requerido')
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres'),
  
  body('tipo')
    .optional()
    .isIn(['producto_terminado', 'materia_prima', 'componente'])
    .withMessage('Tipo de producto inválido'),
  
  validate
];

/**
 * Reglas de validación para agregar material al BOM
 */
export const validateBOMItem = [
  body('material_id')
    .notEmpty()
    .withMessage('El ID del material es requerido')
    .isInt({ min: 1 })
    .withMessage('El ID del material debe ser un número válido'),
  
  body('cantidad')
    .notEmpty()
    .withMessage('La cantidad es requerida')
    .isFloat({ min: 0.0001 })
    .withMessage('La cantidad debe ser mayor a 0'),
  
  body('unidad')
    .optional()
    .isString()
    .withMessage('La unidad debe ser texto'),
  
  body('porcentaje')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('El porcentaje debe estar entre 0 y 100'),
  
  validate
];

