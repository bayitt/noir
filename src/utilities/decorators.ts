import { SetMetadata } from '@nestjs/common';

export const IS_TOKEN_UNGUARDED_KEY = 'unguardedTokenAuth';

export const UnguardedTokenRoute = () =>
  SetMetadata(IS_TOKEN_UNGUARDED_KEY, true);
