import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnguardedTokenRoute } from 'src/utilities';

@Controller('login')
export class AuthController {
  @Get()
  @UnguardedTokenRoute()
  @UseGuards(AuthGuard('google'))
  login() {}
}
