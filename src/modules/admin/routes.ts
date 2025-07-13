import express from 'express';

//
import RequestBodyValidation from '../../middlewares/validation.middle.js';
import { adminLogin } from './controllers/adminLogin.control.js';

const { loginBodyValidation } = RequestBodyValidation;

const router = express.Router();

router.post('/login', loginBodyValidation, adminLogin);

router.post('/books');

router.put('/books/:bookId');

router.delete('/books/:bookId');

export default router;
