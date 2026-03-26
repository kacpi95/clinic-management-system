import express from 'express';

import { authMiddleware } from './auth.middleware.js';
import { login, register, me } from './auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);

export default router;
