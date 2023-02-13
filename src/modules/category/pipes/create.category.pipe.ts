import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { throwException } from 'src/utilities';
import { CategoryService } from '../category.service';

@Injectable()
export class CreateCategoryPipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  async transform(name: string) {
    let slug = name.toLowerCase().replace(/ /g, '-');
    slug = slug.startsWith('/') ? slug : '/' + slug;
    const categories = await this.categoryService.findMany({
      OR: [{ name: name.toLowerCase() }, { slug }],
    });

    if (categories.length > 0)
      throwException(
        HttpStatus.BAD_REQUEST,
        'category-002',
        `Category with name ${name} exists already`,
      );

    return name.toLowerCase();
  }
}
