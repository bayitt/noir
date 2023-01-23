import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(args: Prisma.ArticleCreateInput) {
    return await this.prisma.article.create({
      data: args,
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });
  }

  async update(uuid: string, args: Prisma.ArticleUpdateInput) {
    return await this.prisma.article.update({
      where: { uuid },
      data: args,
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });
  }

  async findUnique(
    where: Prisma.ArticleWhereUniqueInput,
    include: { [key: string]: any } = {},
  ) {
    return await this.prisma.article.findUnique({ where, include });
  }
}
