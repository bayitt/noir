import { Query, Args, Resolver } from '@nestjs/graphql';
import { UnguardedTokenRoute } from '../../../utilities';
import { Article } from '../article.schema';
import { ArticleService } from '../article.service';
import { GetArticlePipe } from '../pipes';

@Resolver()
export class GetArticleResolver {
  constructor(private articleService: ArticleService) {}

  @Query()
  @UnguardedTokenRoute()
  async getArticle(@Args('input', GetArticlePipe) article: Article) {
    const related_articles = this.articleService.findMany(
      {
        NOT: { uuid: article.uuid },
        AND: [{ category_uuid: article?.category?.uuid }],
      },
      1,
      4,
    );
    return { ...article, related_articles };
  }
}
