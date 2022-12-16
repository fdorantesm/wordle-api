import { Injectable } from '@nestjs/common';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';

import { ProfileEntity } from './../../../users/domain/entities/profile.entity';
import { TokenDto } from './../dtos/token.dto';
import { UserEntity } from './../../../users/domain/entities/user.entity';
import { TokenService } from './../services/token.service';
import { UsersService } from '../../../users/infrastructure/database/services/users.service';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  public async exec(
    email: string,
    password: string,
    name: string,
    nick: string,
  ): Promise<{ user: UserEntity } & TokenDto> {
    const isNotFirst = await this.usersService.findOne({});
    const subscriber = [Scope.MATCHES, Scope.TOPS];
    const scopes = isNotFirst ? subscriber : [Scope.ROOT, ...subscriber];

    const formatedEmail = email.toLowerCase();
    const profile = ProfileEntity.create({ name, nick });

    const user = await this.usersService.register(
      formatedEmail,
      password,
      scopes,
      profile,
    );

    const token = await this.tokenService.create({
      scopes,
      id: user.uuid,
    });

    return {
      ...token,
      user,
    };
  }
}
