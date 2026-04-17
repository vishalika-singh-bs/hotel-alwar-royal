import type { Request, Response } from 'express';
import prisma from '../config/prisma';

export async function sendContactMessage(req: Request, res: Response) {
  const { name, email, message } = req.body;

  try {
    await prisma.contactMessage.create({
      data: { name, email, message },
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('sendContactMessage error:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
}

export async function getAllMessages(_req: Request, res: Response) {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(messages);
  } catch (err) {
    console.error('getAllMessages error:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}
