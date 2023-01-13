import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  controllers: [AuthController],
  imports: [ConfigModule],
})
export class AuthModule {}
