import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { generateToken } from '../config/jwt.js';
import { AppError } from '../utils/errors.js';
import { Op } from 'sequelize';

/**
 * Servicio de Autenticación
 * Contiene toda la lógica de negocio relacionada con autenticación
 */
class AuthService {
  constructor() {
    this.SALT_ROUNDS = 10;
  }

  /**
   * Registra un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Promise<Object>} Usuario creado y token
   */
  async register(userData) {
    // Validar que el email no exista
    const emailExists = await User.count({
      where: { email: userData.email }
    });

    if (emailExists > 0) {
      throw new AppError('El email ya está registrado', 400);
    }

    // Hashear password
    const hashedPassword = await this.hashPassword(userData.password);

    // Crear usuario
    const user = await User.create({
      email: userData.email,
      password: hashedPassword,
      nombre: userData.nombre,
      rol: userData.rol || 'usuario',
      estado: 'activo'
    });

    // Generar token
    const token = generateToken({
      id: user.id,
      email: user.email,
      rol: user.rol
    });

    return {
      user: this.userToJSON(user),
      token
    };
  }

  /**
   * Autentica un usuario (login)
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Usuario y token
   */
  async login(email, password) {
    // Buscar usuario
    const user = await User.findOne({
      where: {
        email,
        estado: 'activo'
      }
    });

    if (!user) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Verificar password
    const isPasswordValid = await this.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Generar token
    const token = generateToken({
      id: user.id,
      email: user.email,
      rol: user.rol
    });

    return {
      user: this.userToJSON(user),
      token
    };
  }

  /**
   * Obtiene el perfil del usuario autenticado
   * @param {number} userId - ID del usuario
   * @returns {Promise<Object>} Usuario
   */
  async getProfile(userId) {
    const user = await User.findOne({
      where: {
        id: userId,
        estado: 'activo'
      }
    });

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return this.userToJSON(user);
  }

  /**
   * Hashea una contraseña
   * @param {string} password - Contraseña a hashear
   * @returns {Promise<string>} Contraseña hasheada
   */
  async hashPassword(password) {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Verifica una contraseña
   * @param {string} password - Contraseña a verificar
   * @param {string} hashedPassword - Contraseña hasheada
   * @returns {Promise<boolean>}
   */
  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * Convierte el usuario a objeto JSON sin password
   * @param {User} user - Instancia de User
   * @returns {Object}
   */
  userToJSON(user) {
    const userData = user.toJSON();
    delete userData.password;
    return userData;
  }
}

export default new AuthService();
