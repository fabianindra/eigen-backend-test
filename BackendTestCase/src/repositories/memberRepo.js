import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const repoGetAllMembers = async () => {
  return await prisma.member.findMany({
    select: {
      name: true,
      total_books: true,
    },
  });
};

export const repoGetMember = async (memberId) => {
    return await prisma.member.findUnique({
      where: { id: memberId },
    });
  };