import { PrismaClient } from '.prisma/client';
import { faker } from '@faker-js/faker';
import { generateRandomString } from '../../src/utilities';
import { tagSeeder } from './tag';

const prisma = new PrismaClient();

const featuredImages = [
  'http://res.cloudinary.com/olamileke/image/upload/v1675528575/noir_dev/articles/xgf411117.png',
  'http://res.cloudinary.com/olamileke/image/upload/v1674168830/noir_dev/articles/netflix.png_cutlmi7w8.png',
  'http://res.cloudinary.com/olamileke/image/upload/v1675528463/noir_dev/articles/085010818371.png',
  'http://res.cloudinary.com/olamileke/image/upload/v1674169355/noir_dev/articles/Screenshot%20%284%29.png_qacmdcc3k.png',
  'http://res.cloudinary.com/olamileke/image/upload/v1675528285/noir_dev/articles/8829.png',
  'http://res.cloudinary.com/olamileke/image/upload/v1674597094/noir_dev/articles/Screenshot%20%2855%29.png_4tmlg3kww.png',
];

const tags = new Array(7)
  .fill('')
  .map((_) => faker.lorem.word({ length: { min: 3, max: 7 } }));

export const articleSeeder = async (category_uuid: string) => {
  const dots = new Array(10).fill('.');

  for (const dot of dots) {
    const featuredImageIndex = Math.ceil(
      Math.random() * (featuredImages.length - 1),
    );
    const redirectLink =
      generateRandomString(Number((Math.random() * 6).toFixed(0) as any)) +
      generateRandomString(Number((Math.random() * 6).toFixed(0) as any));
    const tagRelations = [];

    const numberOfTags = Number((Math.random() * 4).toFixed(0) as any);

    for (const tagName of tags.slice(0, numberOfTags)) {
      const tag = await tagSeeder(tagName.toLowerCase());
      tagRelations.push({ tag: { connect: { uuid: tag.uuid } } });
    }

    await prisma.article.create({
      data: {
        category_uuid,
        title: faker.lorem.sentence(),
        slug: faker.lorem.slug(),
        featured_image: featuredImages[featuredImageIndex],
        content: faker.lorem.paragraphs(5),
        status: 1,
        tags: {
          create: tagRelations,
        },
        redirect: {
          create: {
            link: redirectLink,
          },
        },
      },
    });
  }
};
