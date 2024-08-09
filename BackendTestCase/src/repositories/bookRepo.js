import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoGetAvailableBooks = async () => {
  return await prisma.book.findMany({
    where: {
      stock: {
        gt: 0,
      },
    },
  });
};

export const repoGetBook = async (bookId) => {
    return await prisma.book.findUnique({
      where: { id: bookId },
    });
  };