import { Mutation, Args, Resolver } from '@nestjs/graphql';

@Resolver()
export class LoginResolver {
  @Mutation()
  async login() {}
}
