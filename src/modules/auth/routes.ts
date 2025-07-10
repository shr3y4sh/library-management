import express from 'express';
import {
    loginBodyValidation,
    registerBodyValidation,
} from '../../middlewares/auth.middlewares.js';
import { login, register } from './controller.js';

const router = express.Router();

router.post('/register', registerBodyValidation, register);

router.post('/login', loginBodyValidation, login);

export default router;
