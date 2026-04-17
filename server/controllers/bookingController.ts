import type { Request, Response } from 'express';
import prisma from '../config/prisma';

export async function createBooking(req: Request, res: Response) {
  const { roomId, guestName, email, phone, checkIn, checkOut } = req.body;

  try {
    // Verify the room exists before creating the booking
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) {
      res.status(404).json({ error: 'Selected room not found' });
      return;
    }

    const booking = await prisma.booking.create({
      data: {
        roomId,
        guestName,
        email,
        phone,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        status: 'PENDING',
      },
      include: { room: true },
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error('createBooking error:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
}

export async function getAllBookings(_req: Request, res: Response) {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: { room: { select: { name: true, type: true } } },
    });

    res.json(bookings);
  } catch (err) {
    console.error('getAllBookings error:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
}

export async function updateBookingStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = ['PENDING', 'CONFIRMED', 'CANCELLED'];
  if (!allowed.includes(status)) {
    res.status(400).json({ error: 'Invalid status value' });
    return;
  }

  try {
    const booking = await prisma.booking.update({
      where: { id: String(id) },
      data: { status },
    });

    res.json(booking);
  } catch (err: unknown) {
    // Prisma throws P2025 when the record doesn't exist
    if ((err as { code?: string }).code === 'P2025') {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }
    console.error('updateBookingStatus error:', err);
    res.status(500).json({ error: 'Failed to update booking' });
  }
}
