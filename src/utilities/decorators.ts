import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const IS_TOKEN_UNGUARDED_KEY = 'unguardedTokenAuth';

export const UnguardedTokenRoute = () =>
  SetMetadata(IS_TOKEN_UNGUARDED_KEY, true);

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    return GqlExecutionContext.create(ctx).getContext().req.user;
  },
);
