import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import {
  CreateArticleResolver,
  DeleteArticleResolver,
  UpdateArticleResolver,
} from './mutations';
import {
  GetArticleResolver,
  GetArticlesByCategorySlugResolver,
  GetArticlesResolver,
} from './queries';
import { ArticleService } from './article.service';
import { CategoryModule } from '../category/category.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [ConfigModule, CategoryModule, PrismaModule, TagModule],
  providers: [
    CreateArticleResolver,
    DeleteArticleResolver,
    UpdateArticleResolver,
    GetArticleResolver,
    GetArticlesResolver,
    GetArticlesByCategorySlugResolver,
    ArticleService,
  ],
})
export class ArticleModule {}
