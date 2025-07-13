import express from 'express';

import UserController from '../auth/controllers/index.js';
import requestBodyValidation from '../../middlewares/validation.middle.js';
import { authorizationHandler } from '../../middlewares/auth.middle.js';

const router = express.Router();

const { register, login, logout, userProfile } = UserController;
const { registerBodyValidation, loginBodyValidation } = requestBodyValidation;

//
router.post('/register', registerBodyValidation, register);

router.post('/login', loginBodyValidation, login);

router.post('/logout', logout);

router.get('/me/info', authorizationHandler, userProfile);

export default router;
