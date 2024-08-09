import { repoGetAvailableBooks } from "../repositories/bookRepo.js";

export const serviceGetAvailableBooks= async () => {
    try {
      const data = await repoGetAvailableBooks();
      return {
        status: 200,
        success: true,
        message: 'Get available books success',
        data: data,
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