import { Router } from 'express';
import { borrowBooks, returnBooks } from '../controllers/borrowController.js';

const borrowRouter = Router();

/**
 * @swagger
 * /api/borrows/borrow-books:
 *   post:
 *     summary: Borrow a book
 *     description: API for member to borrow a book if the book is available and the member can borrow more books (max: 2 books).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 description: The ID of the book to be borrowed
 *               memberId:
 *                 type: integer
 *                 description: The ID of the member borrowing the book
 *             required:
 *               - bookId
 *               - memberId
 *     responses:
 *       200:
 *         description: Successfully borrowed the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the borrow record
 *                 bookId:
 *                   type: integer
 *                   description: The ID of the borrowed book
 *                 memberId:
 *                   type: integer
 *                   description: The ID of the member who borrowed the book
 *                 borrowDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the book was borrowed
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Server error
 */
borrowRouter.post('/borrow-books', borrowBooks);

/**
 * @swagger
 * /api/borrows/return-books:
 *   post:
 *     summary: Return a borrowed book
 *     description: API to return borrowed book. The member ID should match before continuing. Calculates any penalties for late returns (more than 7 days).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               borrowId:
 *                 type: integer
 *                 description: The ID of the borrow record
 *               memberId:
 *                 type: integer
 *                 description: The ID of the member returning the book
 *             required:
 *               - borrowId
 *               - memberId
 *     responses:
 *       200:
 *         description: Successfully returned the book with possible penalty details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 borrow:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the borrow record
 *                     bookId:
 *                       type: integer
 *                       description: The ID of the borrowed book
 *                     memberId:
 *                       type: integer
 *                       description: The ID of the member who borrowed the book
 *                     borrowDate:
 *                       type: string
 *                       format: date-time
 *                       description: The date when the book was borrowed
 *                     returnDate:
 *                       type: string
 *                       format: date-time
 *                       description: The date when the book was returned
 *                 penalty:
 *                   type: integer
 *                   description: The penalty amount for late returns
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Server error
 */
borrowRouter.post('/return-books', returnBooks);

export default borrowRouter;
