import express from 'express';
import {
    loginBodyValidation,
    registerBodyValidation,
} from '../../middlewares/body_validation.js';
import { login, logout, register, userProfile } from './controller.js';
import { authorizationHandler } from '../../middlewares/auth.middle.js';

const router = express.Router();

router.post('/register', registerBodyValidation, register);

router.post('/login', loginBodyValidation, login);

router.post('/logout', logout);

router.get('/me/info', authorizationHandler, userProfile);

export default router;
