import { Router } from 'express';
import { create, getAll, getById, remove } from '../controllers/ProductController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

// ROTA PÚBLICA
router.get('/', getAll);

router.post('/', authenticate, create);
router.get('/:id', getById);
router.delete('/:id', authenticate, remove);

export default router;