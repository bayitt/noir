import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DummyResolver } from './queries';
import { LoginResolver } from './mutations';
import { ConfigModule } from '../config/config.module';
import { GoogleAuthStrategy } from './google.auth.strategy';
import { GoogleGuard } from './google.guard';
import { TokenModule } from '../token/token.module';

@Module({
  controllers: [AuthController],
  providers: [GoogleAuthStrategy, GoogleGuard, DummyResolver, LoginResolver],
  imports: [ConfigModule, TokenModule],
})
export class AuthModule {}
