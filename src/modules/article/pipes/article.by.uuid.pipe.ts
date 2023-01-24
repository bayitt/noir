import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { throwException } from 'src/utilities';
import { ArticleService } from '../article.service';

@Injectable()
export class ArticleByUuidPipe implements PipeTransform {
  constructor(private articleService: ArticleService) {}

  async transform(uuid: string) {
    const article = await this.articleService.findUnique({ uuid });

    if (!article)
      throwException(
        HttpStatus.NOT_FOUND,
        'article-001',
        `Article with uuid ${uuid} does not exist`,
      );

    return uuid;
  }
}
