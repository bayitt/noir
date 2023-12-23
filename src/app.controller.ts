import { Controller, Get, Post, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { UnguardedTokenRoute } from './utilities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UnguardedTokenRoute()
  @Post('/ping')
  @HttpCode(200)
  ping() {
    return { status: 'ok' };
  }
}
