import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CategoryService } from '../category.service';
import { CreateCategoryPipe } from '../pipes';

@Resolver()
export class CreateCategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Mutation()
  async createCategory(@Args('name', CreateCategoryPipe) name: string) {
    return this.categoryService.create(name);
  }
}
