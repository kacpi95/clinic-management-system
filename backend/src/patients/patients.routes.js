import express from 'express';

import {
  getPatients,
  getPatientById,
  addPatient,
  removePatient,
  updatePatient,
} from './patients.controller.js';

const router = express.Router();

router.get('/', getPatients);
router.get('/:id', getPatientById);
router.post('/', addPatient);
router.delete('/:id', removePatient);
router.put('/:id', updatePatient);

export default router;
