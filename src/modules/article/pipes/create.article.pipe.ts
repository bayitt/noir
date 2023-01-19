import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { throwException } from 'src/utilities';
import { CreateArticleInput } from '../inputs';

@Injectable()
export class CreateArticlePipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  async transform(args: CreateArticleInput) {
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

    return args;
  }
}
