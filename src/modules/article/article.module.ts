import { Module } from '@nestjs/common';
import { CreateArticleResolver } from './mutations';

@Module({
  providers: [CreateArticleResolver],
})
export class ArticleModule {}
