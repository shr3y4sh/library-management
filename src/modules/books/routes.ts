import express from 'express';

//
import BookController from './controllers/index.js';
import { authorizationHandler } from '../../middlewares/auth.middle.js';
//

const { borrowBookController, getBooks } = BookController;

const router = express.Router();

router.get('/', authorizationHandler, getBooks);

router.post('/:bookId/borrow', borrowBookController);

export default router;
