import { DefaultValuePipe } from '@nestjs/common';
import { Query, Args, Resolver } from '@nestjs/graphql';
import { UnguardedTokenRoute } from '../../../utilities';
import { ArticleService } from '../article.service';

@Resolver()
export class GetArticlesResolver {
  constructor(private articleService: ArticleService) {}

  @Query()
  @UnguardedTokenRoute()
  async getArticles(
    @Args('input', new DefaultValuePipe({ page: 1, count: 10, isAdmin: false }))
    args: {
      page: number;
      count: number;
      isAdmin: boolean;
    },
  ) {
    const where = args?.isAdmin ? {} : { status: 1 };
    return await this.articleService.findMany(where, args.page, args.count);
  }
}
