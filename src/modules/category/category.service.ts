import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '.prisma/client';
import { UpdateCategoryInput } from './inputs';

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

  async update(args: UpdateCategoryInput) {
    const data = {};
    const params = JSON.parse(JSON.stringify(args));
    delete params?.uuid;

    Object.entries(params).forEach(([key, value]) => {
      data[key] = value;
    });

    return await this.prisma.category.update({
      where: { uuid: args.uuid },
      data,
    });
  }

  async findUnique(where: Prisma.CategoryWhereUniqueInput) {
    return await this.prisma.category.findUnique({ where });
  }

  async findMany(where: Prisma.CategoryWhereInput) {
    return await this.prisma.category.findMany({ where });
  }

  async delete(uuid: string) {
    return await this.prisma.category.delete({ where: { uuid } });
  }
}
