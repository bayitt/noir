import { Prisma } from '.prisma/client';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { CategoryByUuidPipe } from 'src/modules/category/pipes';
import { ArticleService } from '../article.service';
import { GetArticlesByCategoryUuidInput } from '../inputs';

@Resolver()
export class GetArticlesByCategoryUuidResolver {
  constructor(private articleService: ArticleService) {}

  @Query()
  async getArticlesByCategoryUuid(
    @Args('input', CategoryByUuidPipe) args: GetArticlesByCategoryUuidInput,
  ) {
    let where: Prisma.ArticleWhereInput = { category_uuid: args.category_uuid };

    if (!args.all) {
      where = { ...where, status: 1 };
    }

    return await this.articleService.findMany(where, args.page, args.count);
  }
}
