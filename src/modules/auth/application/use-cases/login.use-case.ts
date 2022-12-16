import { Injectable, UnauthorizedException } from '@nestjs/common';

import { TokenService } from './../services/token.service';
import { UsersService } from '../../../users/infrastructure/database/services/users.service';
import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { TokenDto } from '../dtos/token.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  public async exec(email: string, password: string): Promise<TokenDto> {
    const formatedEmail = email.toLowerCase();

    const hasValidCredentials = await this.usersService.checkPassword(
      formatedEmail,
      password,
    );

    if (!hasValidCredentials) {
      throw new UnauthorizedException('users.invalid_credentials');
    }

    const user = await this.usersService.getLoginData(formatedEmail);

    const tokenPayload: TokenPayloadDto = {
      id: user.uuid,
      scopes: user.scopes,
    };

    const token = await this.tokenService.create(tokenPayload);

    return token;
  }
}
