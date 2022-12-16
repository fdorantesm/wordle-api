import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';

import { TokenService } from '../../../../application/services/token.service';
import { UsersService } from '../../../../../users/infrastructure/database/services/users.service';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {
    super({
      cookieName: 'session',
    });
  }

  public async validate(token: string) {
    if (!token) {
      throw new UnauthorizedException('auth.invalid_credentials');
    }

    const payload = await this.tokenService.decode(token);

    if (!payload) {
      throw new UnauthorizedException('auth.invalid_credentials');
    }

    const user = await this.usersService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException('auth.invalid_credentials');
    }

    return payload;
  }
}
