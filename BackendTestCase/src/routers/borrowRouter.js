import { Router } from 'express';
import { borrowBooks, returnBooks } from '../controllers/borrowController.js';

const borrowRouter = Router();

borrowRouter.post('/borrow-books', borrowBooks);
borrowRouter.post('/return-books', returnBooks);

export default borrowRouter;