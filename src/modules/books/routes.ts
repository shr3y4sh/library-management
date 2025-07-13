import express from 'express';

//
import BookController from './controllers/index.js';
//

const { borrowBookController } = BookController;

const router = express.Router();

router.post('/:bookId/borrow', borrowBookController);

export default router;
