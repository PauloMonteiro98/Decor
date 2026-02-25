import { Router } from 'express';
import { register, login } from '../controllers/AuthController.js';
import { authenticate, type AuthRequest } from '../middlewares/authMiddleware.js';
import type { Response } from 'express';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', authenticate, (req: AuthRequest, res: Response) => {
  res.status(200).json({
    message: 'Você acessou uma rota protegida!',
    seuPerfil: req.user, 
  });
});

export default router;