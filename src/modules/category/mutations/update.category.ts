import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CategoryService } from '../category.service';
import { UpdateCategoryInput } from '../inputs';
import { UpdateCategoryPipe } from '../pipes';

@Resolver()
export class UpdateCategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Mutation()
  async updateCategory(
    @Args('input', UpdateCategoryPipe) args: UpdateCategoryInput,
  ) {
    return await this.categoryService.update(args);
  }
}
