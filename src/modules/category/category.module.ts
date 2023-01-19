import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryService } from './category.service';
import { CreateCategoryResolver, UpdateCategoryResolver } from './mutations';

@Module({
  imports: [PrismaModule],
  providers: [CategoryService, CreateCategoryResolver, UpdateCategoryResolver],
  exports: [CategoryService],
})
export class CategoryModule {}
