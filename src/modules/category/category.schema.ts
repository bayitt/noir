import { Article } from '../article/article.schema';

export class Category {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
  articles: Article[];
}
