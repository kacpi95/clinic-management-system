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

router.use(authMiddleware);

router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.post('/', addAppointment);
router.delete('/:id', removeAppointment);
router.put('/:id', updateAppointment);

export default router;
