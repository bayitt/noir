import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category, Prisma } from '.prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    let slug = name.toLowerCase().replace(/ /g, '-');
    slug = slug.startsWith('/') ? slug : '/' + slug;
    return await this.prisma.category.create({
      data: {
        name,
        slug,
      },
    });
  }

  async findUnique(where: Prisma.CategoryWhereUniqueInput) {
    return await this.prisma.category.findUnique({ where });
  }

  async findMany(where: Prisma.CategoryWhereInput) {
    return await this.prisma.category.findMany({ where });
  }
}
