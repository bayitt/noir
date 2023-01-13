import { Injectable, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { throwException } from 'src/utilities';
import { ConfigService } from '../config/config.service';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CLIENT_REDIRECT'),
      scope: ['email', 'profile'],
    });

    this.configService = configService;
  }

  async validate(_: string, __: string, profile: any, verify: VerifyCallback) {
    const { emails } = profile;
    const email = emails[0].value;
    console.log(email);

    if (email !== this.configService.get('AUTHORIZED_EMAIL'))
      throwException(
        HttpStatus.FORBIDDEN,
        'auth-001',
        'You are not authorized to access the service',
      );

    verify(null, { email });
  }
}
