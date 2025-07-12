import express from 'express';

import { register } from './controllers/register.control.js';
import {
    loginBodyValidation,
    registerBodyValidation,
} from '../../middlewares/validation.middle.js';
import { authorizationHandler } from '../../middlewares/auth.middle.js';
import { login } from './controllers/login.control.js';
import { logout } from './controllers/logout.control.js';
import { userProfile } from './controllers/user-profile.control.js';

const router = express.Router();

router.post('/register', registerBodyValidation, register);

router.post('/login', loginBodyValidation, login);

router.post('/logout', logout);

router.get('/me/info', authorizationHandler, userProfile);

export default router;
