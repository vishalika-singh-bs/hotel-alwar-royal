import { Router } from 'express';
import { login, logout } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { z } from 'zod/v4';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);

export default router;
