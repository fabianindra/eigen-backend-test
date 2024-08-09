import { serviceGetAllMembers } from '../services/memberService.js';

export const getAllMembers = async (req, res) => {
    try {
      const result = await serviceGetAllMembers();
      return res.status(result.status).send(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: 500,
        success: false,
        message: 'Server error',
        error: (error).message,
      });
    }
  };