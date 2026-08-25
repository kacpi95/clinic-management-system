import express from 'express';

import { changePassword, updateProfile } from './settings.controller.js';
import { authMiddleware } from '../auth/auth.middleware.js';

const router = express.Router();

router.put('/profile', authMiddleware, updateProfile);
router.put('/password', authMiddleware, changePassword);

export default router;
