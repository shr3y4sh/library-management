import express from 'express';
import { registerBodyValidation } from '../../middlewares/auth.middlewares.js';
import { register } from './controller.js';

const router = express.Router();

router.post(
    '/register',
    registerBodyValidation,
    register
);

export default router;
