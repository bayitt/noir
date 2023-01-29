import { Prisma } from '.prisma/client';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UnguardedTokenRoute } from '../../../utilities';
import { Category } from 'src/modules/category/category.schema';
import { ArticleService } from '../article.service';
import { GetArticlesByCategorySlugInput } from '../inputs';
import { ArticlesByCategorySlugPipe } from '../pipes';

@Resolver()
export class GetArticlesByCategorySlugResolver {
  constructor(private articleService: ArticleService) {}

  @Query()
  @UnguardedTokenRoute()
  async getArticlesByCategorySlug(
    @Args('input', ArticlesByCategorySlugPipe)
    args: Omit<GetArticlesByCategorySlugInput, 'category_slug'> & {
      category: Category;
    },
  ) {
    const where: Prisma.ArticleWhereInput = {
      category_uuid: args.category.uuid,
      status: 1,
    };

    return await this.articleService.findMany(where, args.page, args.count);
  }
}
