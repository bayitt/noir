import { InputType, Field } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @Field()
  @IsDefined()
  @IsUUID()
  uuid: string;

  @Field()
  name?: string;

  @Field()
  slug?: string;
}
