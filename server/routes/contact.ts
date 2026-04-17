import { Router } from 'express';
import { sendContactMessage, getAllMessages } from '../controllers/contactController';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';
import { z } from 'zod/v4';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string().min(10),
});

const router = Router();

router.post('/', validate(contactSchema), sendContactMessage);
router.get('/', requireAuth, getAllMessages);

export default router;
