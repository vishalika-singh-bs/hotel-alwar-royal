import { Router } from 'express';
import { sendContactMessage, getAllMessages } from '../controllers/contactController.js';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
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
