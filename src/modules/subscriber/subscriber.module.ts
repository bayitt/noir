import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SubscribeResolver } from './mutations';
import { SubscriberService } from './subscriber.service';

@Module({
  imports: [PrismaModule],
  providers: [SubscriberService, SubscribeResolver],
})
export class SubscriberModule {}
