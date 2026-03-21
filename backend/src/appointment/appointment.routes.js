import express from 'express';

import {
  getAppointments,
  getAppointmentById,
  addAppointment,
  removeAppointment,
  updateAppointment,
} from './appointment.controller';
import { authMiddleware } from '../auth/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, getAppointments);
router.get('/:id', authMiddleware, getAppointmentById);
router.post('/', authMiddleware, addAppointment);
router.delete('/:id', authMiddleware, removeAppointment);
router.put('/:id', authMiddleware, updateAppointment);

export default router;
