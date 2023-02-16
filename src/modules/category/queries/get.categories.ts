import { Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from '../category.service';
import { UnguardedTokenRoute } from '../../../utilities';

@Resolver()
export class GetCategoriesResolver {
  constructor(private categoryService: CategoryService) {}

  @Query()
  @UnguardedTokenRoute()
  async getCategories() {
    return await this.categoryService.findMany({});
  }
}
