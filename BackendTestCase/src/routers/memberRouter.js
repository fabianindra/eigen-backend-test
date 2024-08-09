import { Router } from 'express';
import { serviceGetAllMembers } from '../services/memberService.js';

const memberRouter = Router();

memberRouter.get('get-all-members', serviceGetAllMembers);

export default memberRouter;