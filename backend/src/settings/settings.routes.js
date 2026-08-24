import express from 'express';

import { updateProfile } from './settings.controller.js'
import { authMiddleware } from '../auth/auth.middleware.js'

const router = express.Router();

router.put('/profile', authMiddleware, updateProfile);

export default router;
