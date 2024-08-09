import { serviceGetAvailableBooks } from '../services/bookService.js';

export const getAvailableBooks = async (req, res) => {
    try {
      const result = await serviceGetAvailableBooks();
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