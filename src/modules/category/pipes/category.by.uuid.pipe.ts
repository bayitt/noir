import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { GetArticlesByCategoryUuidInput } from 'src/modules/article/inputs';
import { throwException } from 'src/utilities';
import { CategoryService } from '../category.service';

@Injectable()
export class CategoryByUuidPipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  async transform(value: string | GetArticlesByCategoryUuidInput) {
    const uuid =
      typeof value === 'string'
        ? value
        : (value as GetArticlesByCategoryUuidInput).category_uuid;
    const category = await this.categoryService.findUnique({ uuid });

    if (!category)
      throwException(
        HttpStatus.NOT_FOUND,
        'category-001',
        `Category with uuid ${uuid} does not exist`,
      );

    return value;
  }
}
