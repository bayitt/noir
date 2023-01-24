import { Mutation, Args, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import { ArticleByUuidPipe } from '../pipes';

@Resolver()
export class DeleteArticleResolver {
  constructor(private articleService: ArticleService) {}

  @Mutation()
  async deleteArticle(@Args('uuid', ArticleByUuidPipe) uuid: string) {
    return await this.articleService.delete(uuid);
  }
}
