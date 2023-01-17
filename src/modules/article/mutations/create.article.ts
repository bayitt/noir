import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CreateArticleInput } from '../inputs';

@Resolver()
export class CreateArticleResolver {
  @Mutation()
  async createArticle(@Args('input') args: CreateArticleInput) {
    console.log(args);
    return null;
  }
}
