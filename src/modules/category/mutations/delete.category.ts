import { Mutation, Args, Resolver } from '@nestjs/graphql';
import { CategoryService } from '../category.service';
import { CategoryByUuidPipe } from '../pipes';

@Resolver()
export class DeleteCategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Mutation()
  async deleteCategory(@Args('uuid', CategoryByUuidPipe) uuid: string) {
    return await this.categoryService.delete(uuid);
  }
}
