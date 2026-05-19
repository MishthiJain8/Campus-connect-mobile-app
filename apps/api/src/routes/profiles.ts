import { Router } from 'express';
import { prisma } from '../prisma';
import { authGuard, AuthRequest } from '../middleware/authGuard';

const router = Router();

router.get('/:userId', async (req, res, next): Promise<void> => {
  try {
    const profile = await prisma.profile.findUnique({ where: { userId: req.params.userId } });
    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId', authGuard, async (req: AuthRequest, res, next): Promise<void> => {
  try {
    if (req.user?.id !== req.params.userId && req.user?.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    const profile = await prisma.profile.update({
      where: { userId: req.params.userId },
      data: {
        fullName: req.body.fullName,
        major: req.body.major,
        year: req.body.year,
        bio: req.body.bio,
        interests: req.body.interests || [],
      },
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

export { router as profileRouter };
