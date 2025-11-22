/**
 * Script para crear usuario administrador inicial
 * Ejecutar: node scripts/createAdmin.js
 */
import bcrypt from 'bcryptjs';
import { initializeDatabase } from '../src/config/sequelize.js';
import { User } from '../src/models/User.js';
import sequelize from '../src/config/sequelize.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    // Inicializar base de datos
    await initializeDatabase(false);

    const email = 'admin@proscience.com';
    const password = 'admin123';
    const nombre = 'Administrador';
    const rol = 'admin';

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      console.log('❌ El usuario administrador ya existe');
      await sequelize.close();
      process.exit(0);
    }

    // Hashear password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    await User.create({
      email,
      password: hashedPassword,
      nombre,
      rol,
      estado: 'activo'
    });

    console.log('✅ Usuario administrador creado exitosamente');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log('\n⚠️  IMPORTANTE: Cambia la contraseña después del primer login');

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear usuario administrador:', error);
    await sequelize.close();
    process.exit(1);
  }
};

createAdmin();

