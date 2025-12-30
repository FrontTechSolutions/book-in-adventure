
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

// Extension du type Request pour ajouter 'user'
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'error.unauthenticated' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'error.invalid_token' });
    }
    req.user = user;
    next();
  });
}
