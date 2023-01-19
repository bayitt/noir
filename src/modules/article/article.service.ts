import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(args: Prisma.ArticleCreateInput) {
    return await this.prisma.article.create({
      data: args,
    });
  }
}
