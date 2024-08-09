import { serviceBorrowBooks, serviceReturnBooks } from "../services/borrowService.js";

export const borrowBooks = async(req, res) => {
    try {
        const result = await serviceBorrowBooks();
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
}

export const returnBooks = async(req, res) => {
    try {
        const result = await serviceReturnBooks();
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
}