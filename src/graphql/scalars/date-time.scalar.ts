import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('DateTime')
export class DateTimeScalar implements CustomScalar<Date, Date> {
  description = 'DateTime Custom Scalar Type';

  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  serialize(value: Date): Date {
    return value; // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
