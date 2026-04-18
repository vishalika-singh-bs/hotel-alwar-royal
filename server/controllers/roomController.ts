import type { Request, Response } from 'express';
import prisma from '../config/prisma.js';

export async function getAllRooms(_req: Request, res: Response) {
  try {
    const rooms = await prisma.room.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: 'asc' },
    });

    // Parse JSON strings back to arrays for the response
    const parsed = rooms.map((r) => ({
      ...r,
      images: JSON.parse(r.images),
      amenities: JSON.parse(r.amenities),
    }));

    res.json(parsed);
  } catch (err) {
    console.error('getAllRooms error:', err);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
}

export async function getRoomById(req: Request, res: Response) {
  try {
    const room = await prisma.room.findUnique({
      where: { id: String(req.params.id) },
    });

    if (!room) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }

    res.json({
      ...room,
      images: JSON.parse(room.images),
      amenities: JSON.parse(room.amenities),
    });
  } catch (err) {
    console.error('getRoomById error:', err);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
}
