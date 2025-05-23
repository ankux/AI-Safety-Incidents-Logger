import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[ERROR]:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};
