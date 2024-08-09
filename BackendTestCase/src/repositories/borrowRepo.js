import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoGetBorrowData = async (bookId) => {
    return await prisma.borrow.findUnique({
        where: { id: borrowId },
        include: {
            book: true,
            member: true,
        },
    });
  };

export const repoBorrowBooks = async (bookId, memberId, returnDate) => {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            
            const borrow = await prisma.borrow.create({
                data: {
                    bookId,
                    memberId,
                    returnDate,
                },
            });

            await prisma.book.update({
                where: { id: bookId },
                data: {
                    stock: {
                        decrement: 1,
                    },
                },
            });

            await prisma.member.update({
                where: { id: memberId },
                data: {
                    total_books: {
                        increment: 1,
                    },
                },
            });

            return borrow;
        });

        return result;
    } catch (error) {
        console.error("Error borrowing book:", error);
        throw new Error("Failed to borrow book.");
    }
};

export const repoReturnBooks = async (borrowId) => {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            const borrow = await prisma.borrow.findUnique({
                where: { id: borrowId },
            });

            if (!borrow) {
                throw new Error('Borrow record not found.');
            }

            const borrowDate = borrow.borrowDate;
            const returnDate = new Date();
            const daysBorrowed = Math.ceil((returnDate.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24));

            let penalty = 0;
            if (daysBorrowed > 7) {
                penalty = (daysBorrowed - 7) * 5000; 
            }

            await prisma.borrow.update({
                where: { id: borrowId },
                data: {
                    returnDate,
                },
            });

            await prisma.book.update({
                where: { id: borrow.bookId },
                data: {
                    stock: {
                        increment: 1,
                    },
                },
            });

            await prisma.member.update({
                where: { id: borrow.memberId },
                data: {
                    total_books: {
                        decrement: 1,
                    },
                    status: "penalty"
                },
            });

            return {
                borrow,
                penalty,
            };
        });

        return result;
    } catch (error) {
        console.error("Error returning book:", error);
        throw new Error("Failed to return book.");
    }
};


