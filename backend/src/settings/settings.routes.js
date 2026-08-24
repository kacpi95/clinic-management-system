import express from 'express';

import { authenticate } from '../middleware/auth.middleware.js';
import { updateProfile } from '../controllers/settings.controller.js';

const router = express.Router();

router.put('/profile', authenticate, updateProfile);

export default router;
