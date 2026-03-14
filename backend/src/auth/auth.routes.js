import express from 'express';

import { authMiddleware } from './auth.middleware';
import { login, register, me } from './auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);

export default router;
