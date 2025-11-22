import AuthService from '../services/AuthService.js';
import { AppError } from '../utils/errors.js';

/**
 * Controlador de Autenticación
 * Controladores delgados: solo orquestan, la lógica está en los servicios
 * Patrón Controller: maneja requests/responses, delega lógica a servicios
 */
class AuthController {
  constructor() {
    this.authService = AuthService;
  }

  /**
   * Registra un nuevo usuario
   * POST /api/auth/register
   */
  register = async (req, res, next) => {
    try {
      const result = await this.authService.register(req.body);
      
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Autentica un usuario (login)
   * POST /api/auth/login
   */
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Obtiene el perfil del usuario autenticado
   * GET /api/auth/profile
   */
  getProfile = async (req, res, next) => {
    try {
      const user = await this.authService.getProfile(req.user.id);
      
      res.status(200).json({
        success: true,
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();

