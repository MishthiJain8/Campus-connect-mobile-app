import { Router } from 'express';
import { prisma } from '../prisma';
import { authGuard, AuthRequest } from '../middleware/authGuard';

const router = Router();

router.get('/:userId', authGuard, async (req: AuthRequest, res, next): Promise<void> => {
  try {
    if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    const messages = await prisma.message.findMany({
      where: { OR: [{ fromUserId: req.params.userId }, { toUserId: req.params.userId }] },
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

router.post('/', authGuard, async (req: AuthRequest, res, next): Promise<void> => {
  try {
    const message = await prisma.message.create({
      data: {
        fromUserId: req.user!.id,
        toUserId: req.body.toUserId,
        text: req.body.text,
      },
    });
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

export { router as messageRouter };
