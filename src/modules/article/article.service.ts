import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(args: Prisma.ArticleCreateInput) {
    const article = await this.prisma.article.create({
      data: args,
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    return { ...article, tags: article.tags.map(({ tag }) => ({ ...tag })) };
  }

  async update(uuid: string, args: Prisma.ArticleUpdateInput) {
    const updatedArticle = await this.prisma.article.update({
      where: { uuid },
      data: args,
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    return {
      ...updatedArticle,
      tags: updatedArticle.tags.map(({ tag }) => ({ ...tag })),
    };
  }

  async delete(uuid: string) {
    const deletedArticle = await this.prisma.article.delete({
      where: { uuid },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    return {
      ...deletedArticle,
      tags: deletedArticle.tags.map(({ tag }) => ({ ...tag })),
    };
  }

  async findMany(where: Prisma.ArticleWhereInput, page = 1, take = 10) {
    const skip = (page - 1) * take;

    const articles = await this.prisma.article.findMany({
      where,
      skip,
      take,
      orderBy: { created_at: 'desc' },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });
    const parsedArticles = articles.map((article) => ({
      ...article,
      excerpt: article.content ? article.content.slice(0, 200) + '...' : null,
      tags: article.tags.map(({ tag }) => ({ ...tag })),
    }));
    const totalArticles = await this.prisma.article.count({ where });
    const lastPage = Math.ceil(totalArticles / take);

    return {
      articles: parsedArticles,
      pagination: { currentPage: page, lastPage },
    };
  }

  async findUnique(
    where: Prisma.ArticleWhereUniqueInput,
    include: { [key: string]: any } = undefined,
  ) {
    return await this.prisma.article.findUnique({ where, include });
  }
}
