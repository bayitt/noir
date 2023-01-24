import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { throwException } from 'src/utilities';
import { Article } from '../article.schema';
import { ArticleService } from '../article.service';
import { UpdateArticleInput } from '../inputs';

@Injectable()
export class UpdateArticlePipe implements PipeTransform {
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
  ) {}

  async transform(args: UpdateArticleInput) {
    const article = await this.articleService.findUnique(
      {
        uuid: args.uuid,
      },
      { tags: { include: { tag: true } } },
    );

    if (!article)
      throwException(
        HttpStatus.NOT_FOUND,
        'article-001',
        `Article with uuid ${args.uuid} does not exist`,
      );

    if (args?.category_uuid) {
      const category = await this.categoryService.findUnique({
        uuid: args.category_uuid,
      });

      if (!category)
        throwException(
          HttpStatus.NOT_FOUND,
          'category-001',
          `Category with uuid ${args.category_uuid} does not exist`,
        );
    }

    return {
      article: {
        ...article,
        tags: (article as any).tags.map(({ tag }) => ({ ...tag })),
      },
      args,
    };
  }
}
