import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriberService {
  constructor(private prisma: PrismaService) {}

  async create(email: string) {
    return this.prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });
  }
}
