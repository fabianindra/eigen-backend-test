import { serviceBorrowBooks, serviceReturnBooks } from "../services/borrowService.js";

export const borrowBooks = async (req, res) => {
    try {
        const { bookId, memberId } = req.body;
        if (!bookId || !memberId) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: 'Book ID and Member ID are required.',
            });
        }

        const result = await serviceBorrowBooks(bookId, memberId);
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            status: 500,
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
}

export const returnBooks = async (req, res) => {
    try {
        const { borrowId, memberId } = req.body;
        if (!borrowId || !memberId) {
            return res.status(400).send({
                status: 400,
                success: false,
                message: 'Borrow ID and Member ID is required.',
            });
        }

        const result = await serviceReturnBooks(borrowId, memberId);
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            status: 500,
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
}
