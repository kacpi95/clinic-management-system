import express from 'express';

import {
  getAppointments,
  getAppointmentById,
  addAppointment,
  removeAppointment,
  updateAppointment,
  getCalendarAppointments,
} from './appointment.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAppointments);
router.get('/calendar', getCalendarAppointments);
router.get('/:id', getAppointmentById);
router.post('/', addAppointment);
router.delete('/:id', removeAppointment);
router.put('/:id', updateAppointment);

export default router;
