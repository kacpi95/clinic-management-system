import express from 'express';

import {
  getAvailabilities,
  getAvailabilityById,
  addAvailability,
  removeAvailability,
  updateAvailability,
} from './availability.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAvailabilities);
router.get('/:id', getAvailabilityById);
router.post('/', addAvailability);
router.delete('/:id', removeAvailability);
router.put('/:id', updateAvailability);

export default router;
