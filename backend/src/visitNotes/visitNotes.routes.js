import express from 'express';

import {
  getVisitNotes,
  getVisitNoteById,
  addVisitNote,
  removeVisitNote,
  updateVisitNote,
} from './visitNotes.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getVisitNotes);
router.get('/:id', getVisitNoteById);
router.post('/', addVisitNote);
router.delete('/:id', removeVisitNote);
router.put('/:id', updateVisitNote);

export default router;
