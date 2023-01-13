import { UseGuards } from '@nestjs/common';
import { Mutation, Args, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UnguardedTokenRoute } from 'src/utilities';

@Resolver()
export class LoginResolver {
  @Mutation()
  @UnguardedTokenRoute()
  @UseGuards(AuthGuard('google'))
  async login() {}
}
