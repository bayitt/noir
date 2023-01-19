import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CreateArticleResolver } from './mutations';
import { ArticleService } from './article.service';
import { CategoryModule } from '../category/category.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [ConfigModule, CategoryModule, PrismaModule, TagModule],
  providers: [CreateArticleResolver, ArticleService],
})
export class ArticleModule {}
