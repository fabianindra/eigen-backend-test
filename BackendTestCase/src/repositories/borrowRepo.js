import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoGetBorrowData = async (borrowId) => {
    return await prisma.borrow.findUnique({
        where: { id: borrowId },
        include: {
            book: true,
            member: true,
        },
    });
  };

  export const repoBorrowBooks = async (bookId, memberId) => {
    const member = await prisma.member.findUnique({
        where: { id: memberId },
    });

    if (member.total_books >= 2) {
        throw new Error('Members cannot borrow more than 2 books.');
    }

    const result = await prisma.$transaction(async (prisma) => {
        const borrow = await prisma.borrow.create({
            data: {
                bookId,
                memberId,
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
};

export const repoReturnBooks = async (borrowId, memberId) => {
    const result = await prisma.$transaction(async (prisma) => {
        const borrow = await prisma.borrow.findUnique({
            where: { id: borrowId },
        });

        if (!borrow) {
            throw new Error('Borrow record not found.');
        }

        if (borrow.memberId !== parseInt(memberId)) {
            throw new Error('Unauthorized: Member ID does not match the borrow record.');
        }

        const member = await prisma.member.findUnique({
            where: { id: borrow.memberId },
        });

        if (!member) {
            throw new Error('Member not found.');
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

        const memberUpdateData = {
            total_books: {
                decrement: 1,
            },
        };

        if (penalty > 0) {
            memberUpdateData.status = "penalty";
        }

        await prisma.member.update({
            where: { id: borrow.memberId },
            data: memberUpdateData,
        });

        return {
            borrow,
            penalty,
        };
    });

    return result;
};


