import { Category } from '../category/category.schema';
import { Tag } from '../tag/tag.schema';

export class Article {
  uuid: string;
  category: Category;
  title: string;
  slug: string;
  status: boolean;
  featured_image?: string;
  content?: string;
  created_at: string;
  updated_at: string;
  tags: Tag[];
  related_articles?: Article[];
}
