import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { throwException } from 'src/utilities';
import { GetArticlesByCategorySlugInput } from '../inputs';

@Injectable()
export class ArticlesByCategorySlugPipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  async transform(args: GetArticlesByCategorySlugInput) {
    const category = await this.categoryService.findUnique({
      slug: args.category_slug,
    });

    if (!category)
      throwException(
        HttpStatus.NOT_FOUND,
        'category-001',
        `Category with slug ${args.category_slug} does not exist`,
      );

    delete args.category_slug;
    return { ...args, category };
  }
}
