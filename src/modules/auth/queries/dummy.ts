import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class DummyResolver {
  @Query()
  async dummy() {}
}
