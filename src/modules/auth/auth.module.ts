import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginResolver } from './mutations';
import { ConfigModule } from '../config/config.module';
import { GoogleAuthStrategy } from './google.auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [GoogleAuthStrategy, LoginResolver],
  imports: [ConfigModule],
})
export class AuthModule {}
