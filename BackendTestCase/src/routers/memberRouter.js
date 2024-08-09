import { Router } from 'express';
import { getAllMembers } from '../controllers/memberController.js';

const memberRouter = Router();

memberRouter.get('/get-all-members', getAllMembers);

export default memberRouter;