import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import { Prisma } from '@prisma/client';
import { UpdateArticleInput } from '../inputs';
import { UpdateArticlePipe } from '../pipes';
import { deleteImage, uploadImage } from 'src/utilities';
import { ConfigService } from 'src/modules/config/config.service';
import { Article } from '../article.schema';

@Resolver()
export class UpdateArticleResolver {
  constructor(
    private articleService: ArticleService,
    private configService: ConfigService,
  ) {}

  @Mutation()
  async updateArticle(
    @Args('input', UpdateArticlePipe)
    { article, args }: { article: Article; args: UpdateArticleInput },
  ) {
    const initialInputs = JSON.parse(JSON.stringify(args));
    delete initialInputs?.article_uuid;
    delete initialInputs?.featured_image;
    delete initialInputs?.category_uuid;

    let articleInput: Prisma.ArticleUpdateInput = { ...initialInputs };

    if (args?.featured_image) {
      article?.featured_image &&
        (await deleteImage(this.configService, article.featured_image));

      const featured_image = await uploadImage(
        this.configService,
        await args.featured_image,
      );
      articleInput = { ...articleInput, featured_image };
    }

    if (args?.category_uuid) {
      articleInput = {
        ...articleInput,
        category: { connect: { uuid: args.category_uuid } },
      };
    }
  }
}
