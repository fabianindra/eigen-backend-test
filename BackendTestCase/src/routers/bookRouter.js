import { Router } from 'express';
import { getAvailableBooks } from '../controllers/bookController.js';

const bookRouter = Router();

bookRouter.get('/get-available-books', getAvailableBooks);

export default bookRouter;