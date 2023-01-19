import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(name: string) {
    return this.prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}
