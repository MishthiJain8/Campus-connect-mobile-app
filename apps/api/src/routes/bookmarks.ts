import { Router } from 'express';
import { prisma } from '../prisma';
import { authGuard, AuthRequest } from '../middleware/authGuard';

const router = Router();

router.get('/', authGuard, async (req: AuthRequest, res, next) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({ where: { userId: req.user!.id } });
    res.json(bookmarks);
  } catch (error) {
    next(error);
  }
});

router.post('/', authGuard, async (req: AuthRequest, res, next) => {
  try {
    const bookmark = await prisma.bookmark.create({
      data: {
        userId: req.user!.id,
        itemId: req.body.itemId,
        itemType: req.body.itemType,
      },
    });
    res.status(201).json(bookmark);
  } catch (error) {
    next(error);
  }
});

export { router as bookmarkRouter };
