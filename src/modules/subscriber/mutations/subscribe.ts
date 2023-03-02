import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UnguardedTokenRoute } from '../../../utilities';
import { SubscriberService } from '../subscriber.service';

@Resolver()
export class SubscribeResolver {
  constructor(private subscriberService: SubscriberService) {}

  @UnguardedTokenRoute()
  @Mutation()
  async subscribe(@Args('email') email: string) {
    return await this.subscriberService.create(email);
  }
}
