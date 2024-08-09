import { repoGetAllMembers } from "../repositories/memberRepo.js";

export const serviceGetAllMembers = async () => {
    try {
      const data = await repoGetAllMembers();
      return {
        status: 200,
        success: true,
        message: 'Get all members success',
        data: data
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