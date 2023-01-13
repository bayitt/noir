import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class AuthController {
  @Get()
  @UseGuards(AuthGuard('google'))
  login() {}
}
