import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const tagSeeder = async (name: string) => {
  return await prisma.tag.upsert({
    where: {
      name,
    },
    update: {},
    create: { name },
  });
};
