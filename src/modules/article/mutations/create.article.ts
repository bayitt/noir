import { Prisma } from '.prisma/client';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ConfigService } from 'src/modules/config/config.service';
import { TagService } from 'src/modules/tag/tag.service';
import { generateRandomString, uploadImage } from 'src/utilities';
import { ArticleService } from '../article.service';
import { CreateArticleInput } from '../inputs';
import { CreateArticlePipe } from '../pipes';

@Resolver()
export class CreateArticleResolver {
  constructor(
    private articleService: ArticleService,
    private configService: ConfigService,
    private tagService: TagService,
  ) {}

  @Mutation()
  async createArticle(
    @Args('input', CreateArticlePipe) args: CreateArticleInput,
  ) {
    let slug =
      args.title.toLowerCase().replace(/ /g, '-') +
      '-' +
      generateRandomString(6);
    slug = slug.startsWith('/') ? slug : '/' + slug;

    let articleInput: Prisma.ArticleCreateInput = {
      title: args.title,
      status: Number(args?.status ?? 0),
      content: args?.content,
      slug,
      tags: {
        create: await this.createTags(args?.tags ?? []),
      },
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

    const article = await this.articleService.create(articleInput);

    return { ...article, tags: article.tags.map(({ tag }) => ({ ...tag })) };
  }

  async createTags(tags: string[]) {
    const tagRelations = [];

    for (const tagName of tags) {
      const tag = await this.tagService.findOrCreate(tagName.toLowerCase());
      tagRelations.push({ tag: { connect: { uuid: tag.uuid } } });
    }

    return tagRelations;
  }
}
