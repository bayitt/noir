import { Query, Args, Resolver } from '@nestjs/graphql';
import { UnguardedTokenRoute } from '../../../utilities';
import { Article } from '../article.schema';
import { GetArticlePipe } from '../pipes';

@Resolver()
export class GetArticleResolver {
  @Query()
  @UnguardedTokenRoute()
  async getArticle(@Args('input', GetArticlePipe) article: Article) {
    return article;
  }
}
