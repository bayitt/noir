import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import { Prisma } from '@prisma/client';
import { UpdateArticleInput } from '../inputs';
import { UpdateArticlePipe } from '../pipes';
import { deleteImage, uploadImage } from 'src/utilities';
import { ConfigService } from 'src/modules/config/config.service';
import { Article } from '../article.schema';
import { TagService } from 'src/modules/tag/tag.service';

@Resolver()
export class UpdateArticleResolver {
  constructor(
    private articleService: ArticleService,
    private configService: ConfigService,
    private tagService: TagService,
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

    console.log(args);
    if (args?.tags)
      articleInput = {
        ...articleInput,
        tags: {
          create: await this.getUpdatedTags(
            article,
            args.tags.map((name) => name.toLowerCase()),
          ),
        },
      };

    console.log(articleInput);

    return await this.articleService.update(article.uuid, articleInput);
  }

  async getUpdatedTags(article: Article, tags: string[]) {
    const tagsToDetach = article.tags.filter(
      ({ name }) => !tags.includes(name.toLowerCase()),
    );

    console.log(tagsToDetach);
    await this.articleService.update(article.uuid, {
      tags: {
        disconnect: tagsToDetach.map(({ uuid }) => ({
          article_uuid_tag_uuid: { article_uuid: article.uuid, tag_uuid: uuid },
        })),
      },
    });

    const tagsToAttach = tags.filter(
      (name) =>
        !article.tags.map(({ name }) => name.toLowerCase()).includes(name),
    );
    const tagRelations = [];

    for (const tagName of tagsToAttach) {
      const tag = await this.tagService.findOrCreate(tagName.toLowerCase());
      tagRelations.push({ tag: { connect: { uuid: tag.uuid } } });
    }

    return tagRelations;
  }
}
