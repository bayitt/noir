import { Scalar } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload-ts';

@Scalar('Upload')
export class UploadScalar {
  description = 'Upload Custom Scalar Type';

  parseValue(value) {
    return GraphQLUpload.parseValue(value);
  }

  serialize(value: any) {
    return GraphQLUpload.serialize(value);
  }

  parseLiteral(ast) {
    return GraphQLUpload.parseLiteral(ast);
  }
}
