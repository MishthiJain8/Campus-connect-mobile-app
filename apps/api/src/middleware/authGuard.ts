import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type AuthRequest = Request & { user?: { id: string; role: string } };

export function authGuard(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET || 'secret';
    const payload = jwt.verify(token, secret) as { sub: string; role: string };
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export function adminGuard(req: AuthRequest, res: Response, next: NextFunction): void {
  authGuard(req, res, () => {
    if (req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    next();
  });
}
