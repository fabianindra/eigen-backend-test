import { repoGetAllMembers } from "../repositories/memberRepo.js";

export const serviceGetAllMembers= async (req) => {
    try {
      const data = await repoGetAllMembers();
      return {
        status: 200,
        success: true,
        message: 'Get all members success',
        data: data.result,
        count: data.count,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: 'Server error',
        error: (error).message,
      };
    }
}