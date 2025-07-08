import express, { Request } from 'express';
import { registerBodyValidation } from '../../middlewares/auth.middlewares.js';
import { RegisterBody } from './types.js';

const router = express.Router();

router.post(
    '/register',
    registerBodyValidation,
    (req: Request<unknown, unknown, RegisterBody>, res) => {
        const { firstName, lastName, email } = req.body;

        res.status(201).json({ id: 42, firstName, lastName, email });
    },
);

export default router;
