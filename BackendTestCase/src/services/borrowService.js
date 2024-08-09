import { repoGetBook } from '../repositories/bookRepo.js';
import { repoGetBorrowData, repoReturnBooks } from '../repositories/borrowRepo.js';
import { repoGetMember } from '../repositories/memberRepo.js';
import { repoBorrowBooks } from '../repositories/borrowRepo.js';

export const serviceBorrowBooks = async (bookId, memberId, returnDate) => {
    try {
        if (!bookId || !memberId) {
            throw new Error("Book ID and Member ID are required.");
        }

        const book = repoGetBook(bookId)
        if (!book) {
            throw new Error("Book not found.");
        }
        if (book.stock <= 0) {
            throw new Error("Book is out of stock.");
        }

        const member = repoGetMember(memberId)
        if (!member) {
            throw new Error("Member not found.");
        }
        if (member.status !== "active") {
            throw new Error("Member cannot borrow books.");
        }
        const borrow = await repoBorrowBooks(bookId, memberId, returnDate);
        return borrow;
    } catch (error) {
        console.error("Error in serviceBorrowBooks:", error);
        throw new Error("Failed to borrow book.");
    }
};

export const serviceReturnBooks = async (borrowId) => {
    try {
        if (!borrowId) {
            throw new Error("Borrow ID is required.");
        }

        const borrow = repoGetBorrowData(borrowId);
        if (!borrow) {
            throw new Error("Borrow record not found.");
        }
        if (borrow.returnDate) {
            throw new Error("This book has already been returned.");
        }

        const { borrow: returnedBorrow, penalty } = await repoReturnBooks(borrowId);

        if (penalty > 0) {
            console.log(`Penalty for late return: $${penalty}`);
        }
        return {
            returnedBorrow,
            penalty,
        };
    } catch (error) {
        console.error("Error in serviceReturnBook:", error);
        throw new Error("Failed to return book.");
    }
};