import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { TokenGuard } from './token.guard';
import { TokenStrategy } from './token.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '3d' },
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ConfigModule,
  ],
  providers: [TokenStrategy, { provide: APP_GUARD, useClass: TokenGuard }],
})
export class TokenModule {}
