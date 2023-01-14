import { Resolver, Args, Mutation } from '@nestjs/graphql';

@Resolver()
export class CreateArticleResolver {
  @Mutation()
  async createArticle() {}
}
