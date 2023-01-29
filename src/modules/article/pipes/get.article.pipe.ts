import { Injectable, PipeTransform, HttpStatus } from '@nestjs/common';
import { UnguardedTokenRoute } from '../../../utilities';
import { ArticleService } from '../article.service';
import { GetArticleInput } from '../inputs';
import { throwException } from '../../../utilities';

@Injectable()
@UnguardedTokenRoute()
export class GetArticlePipe implements PipeTransform {
  constructor(private articleService: ArticleService) {}

  async transform(args: GetArticleInput) {
    const { articles } = await this.articleService.findMany({
      slug: args.slug,
    });

    if (articles.length === 0)
      throwException(
        HttpStatus.NOT_FOUND,
        'article-001',
        `Article with slug ${args.slug} does not exist`,
      );

    const article = articles[0];

    if (article.status === 0 && !args.isAdmin)
      throwException(
        HttpStatus.NOT_FOUND,
        'article-001',
        `Article with slug ${args.slug} does not exist`,
      );

    return article;
  }
}
