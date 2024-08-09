import { Router } from 'express';
import { getAvailableBooks } from '../controllers/bookController.js';

const bookRouter = Router();

/**
 * @swagger
 * /api/books/get-available-books:
 *   get:
 *     summary: Retrieve a list of available books
 *     description: Returns a list of books that are currently available in the library with their titles and stock.
 *     responses:
 *       200:
 *         description: A list of available books with their titles and stock
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The title of the book
 *                   stock:
 *                     type: integer
 *                     description: The number of available copies of the book
 *       500:
 *         description: Server error
 */
bookRouter.get('/get-available-books', getAvailableBooks);

export default bookRouter;