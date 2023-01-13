import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DummyResolver } from './queries';
import { LoginResolver } from './mutations';
import { ConfigModule } from '../config/config.module';
import { GoogleAuthStrategy } from './google.auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [GoogleAuthStrategy, DummyResolver, LoginResolver],
  imports: [ConfigModule],
})
export class AuthModule {}
