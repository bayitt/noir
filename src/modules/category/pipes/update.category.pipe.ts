import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { throwException } from 'src/utilities';
import { CategoryService } from '../category.service';
import { UpdateCategoryInput } from '../inputs';
import { Prisma } from '@prisma/client';

@Injectable()
export class UpdateCategoryPipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  async transform(args: UpdateCategoryInput) {
    const category = await this.categoryService.findUnique({ uuid: args.uuid });

    if (!category)
      throwException(
        HttpStatus.NOT_FOUND,
        'category-001',
        `Category with uuid ${args.uuid} does not exist`,
      );

    let filter: Prisma.CategoryWhereInput = { NOT: { uuid: args.uuid } };

    if (args?.name || args?.slug) {
      filter = updateFilter(args, 'name', filter);
      filter = updateFilter(args, 'slug', filter);
    }

    const categoriesWithParams = await this.categoryService.findMany({
      ...filter,
    });

    if (categoriesWithParams.length > 0)
      throwException(
        HttpStatus.BAD_REQUEST,
        'category-002',
        `Category with specified name and/or slug exists already`,
      );

    return args;
  }
}

const updateFilter = (
  args: UpdateCategoryInput,
  key: 'name' | 'slug',
  filter: Prisma.CategoryWhereInput,
): Prisma.CategoryWhereInput => {
  const parsedArgs = JSON.parse(JSON.stringify(args));

  if (parsedArgs[key])
    return {
      ...filter,
      OR: [...((filter?.OR as any) ?? []), { [key]: parsedArgs[key] }],
    };

  return filter;
};
