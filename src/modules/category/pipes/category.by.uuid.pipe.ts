import { Injectable, PipeTransform, HttpStatus } from '@nestjs/common';
import { throwException } from 'src/utilities';
import { CategoryService } from '../category.service';

@Injectable()
export class CategoryByUuidPipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  async transform(uuid: string) {
    const category = await this.categoryService.findUnique({ uuid });

    if (!category)
      throwException(
        HttpStatus.NOT_FOUND,
        'category-001',
        `Category with uuid ${uuid} does not exist`,
      );

    return uuid;
  }
}
