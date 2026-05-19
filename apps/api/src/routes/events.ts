import { Router } from 'express';
import { prisma } from '../prisma';
import { authGuard } from '../middleware/authGuard';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const events = await prisma.event.findMany({ orderBy: { startsAt: 'asc' } });
    res.json(events);
  } catch (error) {
    next(error);
  }
});

router.get('/featured', async (req, res, next) => {
  try {
    const events = await prisma.event.findMany({ where: { isFeatured: true } });
    res.json(events);
  } catch (error) {
    next(error);
  }
});

router.post('/', authGuard, async (req, res, next) => {
  try {
    const event = await prisma.event.create({
      data: {
        campusId: req.body.campusId,
        title: req.body.title,
        description: req.body.description,
        startsAt: new Date(req.body.startsAt),
        endsAt: new Date(req.body.endsAt),
        location: req.body.location,
        isFeatured: Boolean(req.body.isFeatured),
      },
    });
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
});

export { router as eventRouter };
