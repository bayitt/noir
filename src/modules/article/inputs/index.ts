import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload-ts';
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
}
