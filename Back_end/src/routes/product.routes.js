import express from 'express';
import ProductController from '../controllers/ProductController.js';
import { validateCreateProduct, validateBOMItem } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * Rutas de productos y BOM
 * Todas requieren autenticación
 */

// Rutas de productos
router.post('/', authenticate, validateCreateProduct, ProductController.createProduct);
router.get('/', authenticate, ProductController.getAllProducts);
router.get('/:id', authenticate, ProductController.getProductById);
router.put('/:id', authenticate, ProductController.updateProduct);

// Rutas de BOM
router.post('/:id/bom', authenticate, ProductController.createOrUpdateBOM);
router.get('/:id/bom/history', authenticate, ProductController.getBOMHistory);

// Rutas de items del BOM
router.post('/boms/:bomId/items', authenticate, validateBOMItem, ProductController.addMaterialToBOM);
router.get('/boms/:bomId', authenticate, ProductController.getBOMWithItems);
router.put('/bom-items/:itemId', authenticate, ProductController.updateBOMItem);
router.delete('/bom-items/:itemId', authenticate, ProductController.deleteBOMItem);

export default router;
