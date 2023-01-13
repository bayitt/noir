import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_TOKEN_UNGUARDED_KEY } from 'src/utilities';

@Injectable()
export class TokenGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const unguarded = this.reflector.getAllAndOverride<boolean>(
      IS_TOKEN_UNGUARDED_KEY,
      [context.getHandler(), context.getClass],
    );

    if (unguarded) return true;

    return super.canActivate(context);
  }
}
