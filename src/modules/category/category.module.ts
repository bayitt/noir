import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryService } from './category.service';
import { CreateCategoryResolver } from './mutations';

@Module({
  imports: [PrismaModule],
  providers: [CategoryService, CreateCategoryResolver],
})
export class CategoryModule {}
