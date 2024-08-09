import { Router } from 'express';
import { getAllMembers } from '../controllers/memberController.js';

const memberRouter = Router();

/**
 * @swagger
 * /api/members/get-all-members:
 *   get:
 *     summary: Retrieve a list of all members
 *     description: Returns a list of all members in the library, including their names and the total number of books they have.
 *     responses:
 *       200:
 *         description: A list of all members with their names and total number of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: Response status code
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                 message:
 *                   type: string
 *                   description: A message describing the result of the request
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the member
 *                       total_books:
 *                         type: integer
 *                         description: The total number of books the member has
 *       500:
 *         description: Server error
 */
memberRouter.get('/get-all-members', getAllMembers);

export default memberRouter;
