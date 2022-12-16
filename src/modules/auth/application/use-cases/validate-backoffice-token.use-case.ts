import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../../../users/infrastructure/database/services/users.service';
import { TokenPayloadDto } from '../dtos/token-payload.dto';

@Injectable()
export class ValidateBackofficeTokenUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async exec(userId: string): Promise<TokenPayloadDto> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('auth.invalid_credentials');
    }

    return {
      id: user.uuid,
      scopes: user.scopes,
    };
  }
}
