import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { articleSeeder } from './article';

const prisma = new PrismaClient();

const categories = ['Tools', 'Guides', 'How Tos', 'Reactive Applications'];

export async function main() {
  for (const name of categories) {
    const slug = name.toLowerCase().replace(/ /g, '-');
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: faker.lorem.sentence(),
      },
    });
    await articleSeeder(category.uuid);
  }
}
