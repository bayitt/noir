import { Injectable, PipeTransform } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { ArticleService } from '../article.service';

@Injectable()
export class CreateArticlePipe implements PipeTransform {
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
  ) {}

  async transform() {}
}
