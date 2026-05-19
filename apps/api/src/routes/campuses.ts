import { Router } from 'express';
import { prisma } from '../prisma';
import { authGuard } from '../middleware/authGuard';

const router = Router();

router.get('/', async (req, res, next): Promise<void> => {
  try {
    const campuses = await prisma.campus.findMany({ include: { events: true } });
    res.json(campuses);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next): Promise<void> => {
  try {
    const campus = await prisma.campus.findUnique({ where: { id: req.params.id }, include: { events: true } });
    if (!campus) {
      res.status(404).json({ error: 'Campus not found' });
      return;
    }
    res.json(campus);
  } catch (error) {
    next(error);
  }
});

router.post('/', authGuard, async (req, res, next): Promise<void> => {
  try {
    const campus = await prisma.campus.create({
      data: {
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        description: req.body.description,
        studentCount: Number(req.body.studentCount) || 0,
      },
    });
    res.status(201).json(campus);
  } catch (error) {
    next(error);
  }
});

export { router as campusRouter };
