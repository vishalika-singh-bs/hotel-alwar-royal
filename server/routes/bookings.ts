import { Router } from 'express';
import { createBooking, getAllBookings, updateBookingStatus } from '../controllers/bookingController';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';
import { z } from 'zod/v4';

const bookingSchema = z.object({
  roomId: z.string().min(1),
  guestName: z.string().min(2),
  email: z.email(),
  phone: z.string().min(10),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
});

const statusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']),
});

const router = Router();

router.post('/', validate(bookingSchema), createBooking);
router.get('/', requireAuth, getAllBookings);
router.patch('/:id/status', requireAuth, validate(statusSchema), updateBookingStatus);

export default router;
