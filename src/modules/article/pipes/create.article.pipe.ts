import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { throwException } from 'src/utilities';
import { CreateArticleInput } from '../inputs';

@Injectable()
export class CreateArticlePipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  async transform(args: CreateArticleInput) {
    if (args?.category_uuid) {
      console.log('0.5');
      const category = await this.categoryService.findUnique({
        uuid: args.category_uuid,
      });

      console.log('0.8');
      console.log(category);

      if (!category)
        return throwException(
          HttpStatus.NOT_FOUND,
          'category-001',
          `Category with uuid ${args.category_uuid} does not exist`,
        );
    }

    console.log('1');

    return args;
  }
}
