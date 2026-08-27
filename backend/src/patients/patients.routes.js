import express from 'express';

import {
  getPatients,
  getPatientById,
  addPatient,
  removePatient,
  updatePatient,
} from './patients.controller.js';

import { authMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getPatients);
router.get('/:id', authMiddleware, getPatientById);
router.post('/', authMiddleware, addPatient);
router.delete('/:id', authMiddleware, removePatient);
router.put('/:id', authMiddleware, updatePatient);

export default router;
