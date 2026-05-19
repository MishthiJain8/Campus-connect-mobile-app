import { Router, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../prisma';
import { AuthRequest } from '../middleware/authGuard';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(3),
  major: z.string().optional(),
  year: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function signToken(payload: object, secret: string, expiresIn: string): string {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
}

router.post('/register', async (req, res, next): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      res.status(409).json({ error: 'Email already registered' });
      return;
    }

    const hashed = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashed,
        role: 'student',
        profile: {
          create: {
            fullName: data.fullName,
            major: data.major ?? 'Undeclared',
            year: data.year ?? 'Freshman',
            bio: '',
            interests: [],
          },
        },
      },
    });

    const accessToken = signToken({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', '15m');
    const refreshToken = signToken({ sub: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET || 'refresh-secret', '7d');
    res.status(201).json({ user: { id: user.id, email: user.email, role: user.role }, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const accessToken = signToken({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', '15m');
    const refreshToken = signToken({ sub: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET || 'refresh-secret', '7d');
    res.status(200).json({ user: { id: user.id, email: user.email, role: user.role }, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', async (req, res): Promise<void> => {
  const { token } = req.body;
  try {
    const secret = process.env.JWT_REFRESH_SECRET || 'refresh-secret';
    const payload = jwt.verify(token, secret) as { sub: string; role: string };
    const accessToken = signToken({ sub: payload.sub, role: payload.role }, process.env.JWT_SECRET || 'secret', '15m');
    res.status(200).json({ accessToken });
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

export { router as authRouter };
