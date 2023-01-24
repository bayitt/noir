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

  async deleteArticleTagLinks(article_uuid: string, tag_uuids: string[]) {
    await this.prisma.articleOnTag.deleteMany({
      where: { article_uuid, tag_uuid: { in: tag_uuids } },
    });
  }
}
