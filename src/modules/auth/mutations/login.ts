import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { TokenService } from 'src/modules/token/token.service';
import { UnguardedTokenRoute, User } from 'src/utilities';
import { GoogleGuard } from '../google.guard';

@Resolver()
export class LoginResolver {
  constructor(private tokenService: TokenService) {}

  @Mutation()
  @UnguardedTokenRoute()
  @UseGuards(GoogleGuard)
  async login(@User() user: { email: string }) {
    return { email: user.email, token: this.tokenService.generate(user.email) };
  }
}
