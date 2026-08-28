import express from 'express';

import {
  getAppointments,
  getAppointmentById,
  addAppointment,
  updateAppointment,
  getCalendarAppointments,
  cancelAppointment,
} from './appointment.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAppointments);
router.get('/calendar', getCalendarAppointments);
router.get('/:id', getAppointmentById);
router.post('/', addAppointment);
router.patch('/:id/cancel', cancelAppointment);
router.put('/:id', updateAppointment);

export default router;
