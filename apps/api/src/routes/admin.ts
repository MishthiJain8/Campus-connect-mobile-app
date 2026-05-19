import { Router } from 'express';
import { prisma } from '../prisma';
import { adminGuard } from '../middleware/authGuard';

const router = Router();

router.get('/users', adminGuard, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({ include: { profile: true } });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.delete('/user/:id', adminGuard, async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as adminRouter };
