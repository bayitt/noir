import { PartialType } from '@nestjs/mapped-types';
import { InputType, Field } from '@nestjs/graphql';
import { Stream } from 'stream';

export class Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@InputType()
export class CreateArticleInput {
  @Field()
  title: string;

  @Field()
  category_uuid?: string;

  @Field()
  content?: string;

  @Field()
  featured_image?: Promise<Upload>;

  @Field()
  status?: boolean;

  @Field()
  tags?: string[];
}

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  @Field()
  uuid: string;

  @Field()
  slug?: string;
}

@InputType()
export class GetArticlesByCategoryUuidInput {
  @Field()
  category_uuid: string;

  @Field()
  page: number;

  @Field()
  count: number;

  @Field()
  all: boolean;
}
