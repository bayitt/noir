import { Injectable, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });

    this.configService = configService;
  }

  validate({ sub }: { sub: string }) {
    return sub === this.configService.get('AUTHORIZED_EMAIL')
      ? { email: sub }
      : null;
  }
}
