import { Query, Args, Resolver } from '@nestjs/graphql';

@Resolver()
export class GetArticleResolver {
  @Query()
  async getArticle() {}
}
