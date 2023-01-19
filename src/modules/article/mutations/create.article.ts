import { Prisma } from '.prisma/client';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ConfigService } from 'src/modules/config/config.service';
import { generateRandomString, uploadImage } from 'src/utilities';
import { ArticleService } from '../article.service';
import { CreateArticleInput } from '../inputs';

@Resolver()
export class CreateArticleResolver {
  constructor(
    private articleService: ArticleService,
    private configService: ConfigService,
  ) {}

  @Mutation()
  async createArticle(@Args('input') args: CreateArticleInput) {
    let articleInput: Prisma.ArticleCreateInput = {
      title: args.title,
      status: Number(args?.status ?? 0),
      content: args?.content,
      slug:
        args.title.toLowerCase().replace(/ /g, '-') +
        '-' +
        generateRandomString(10),
    };

    if (args?.featured_image) {
      const featured_image = await uploadImage(
        this.configService,
        await args.featured_image,
      );
      articleInput = { ...articleInput, featured_image };
    }

    if (args?.category_uuid)
      articleInput = {
        ...articleInput,
        category: { connect: { uuid: args.category_uuid } },
      };

    return await this.articleService.create(articleInput);
  }
}
