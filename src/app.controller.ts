import { Controller, Get, Post, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './modules/prisma/prisma.service';
import { UnguardedTokenRoute } from './utilities';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UnguardedTokenRoute()
  @Post('/ping')
  @HttpCode(200)
  async ping() {
    try {
      await this.prismaService.article.findUnique({
        where: { uuid: 'random-uuid' },
      });
      return { database: 'healthy' };
    } catch {
      return { database: 'unhealthy' };
    }
  }
}
