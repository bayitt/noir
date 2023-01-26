import { Query, Args, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../article.service';

@Resolver()
export class GetArticlesResolver {
  constructor(private articleService: ArticleService) {}

  @Query()
  async getArticles(@Args('input') args: { page: number; count: number }) {
    return await this.articleService.findMany({}, args.page, args.count);
  }
}
