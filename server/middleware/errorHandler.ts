import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error('Server error:', err.message);

  // Never expose internal error details to client
  res.status(500).json({
    error: 'An internal server error occurred.',
  });
}
