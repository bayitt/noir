import { Query, Args, Resolver } from '@nestjs/graphql';
import { UnguardedTokenRoute } from '../../../utilities';
import { ArticleService } from '../article.service';

@Resolver()
@UnguardedTokenRoute()
export class GetArticlesResolver {
  constructor(private articleService: ArticleService) {}

  @Query()
  async getArticles(
    @Args('input') args: { page: number; count: number; isAdmin: boolean },
  ) {
    const where = args?.isAdmin ? {} : { status: 1 };
    return await this.articleService.findMany(where, args.page, args.count);
  }
}
