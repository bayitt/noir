import { Query, Args, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../article.service';

@Resolver()
export class GetArticlesResolver {
  constructor(private articleService: ArticleService) {}

  @Query()
  async getArticles(
    @Args('input') args: { page: number; count: number; all: boolean },
  ) {
    const where = args?.all ? {} : { status: 1 };
    return await this.articleService.findMany(where, args.page, args.count);
  }
}
