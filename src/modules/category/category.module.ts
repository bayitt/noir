import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryService } from './category.service';
import {
  CreateCategoryResolver,
  DeleteCategoryResolver,
  UpdateCategoryResolver,
} from './mutations';
import { GetCategoriesResolver } from './queries';

@Module({
  imports: [PrismaModule],
  providers: [
    CategoryService,
    CreateCategoryResolver,
    DeleteCategoryResolver,
    UpdateCategoryResolver,
    GetCategoriesResolver,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
