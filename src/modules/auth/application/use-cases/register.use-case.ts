import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CommandBus } from '@nestjs/cqrs';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { DateTime } from 'luxon';
import * as capitalize from 'lodash/capitalize';
import { ConfigService } from '@nestjs/config';
import { HttpServerConfiguration } from '@app/common';

import { TemplateService } from './../../../shared/services/template.service';
import { EmailService } from './../../../shared/services/email.service';
import { ShortIdService } from './../../../shared/services/short-id.service';
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
    password?: string,
    profile?: ProfileEntity,
  ): Promise<{ user: UserEntity } & TokenDto> {
    const isNotFirst = await this.usersService.findOne({});
    const subscriber = [Scope.RAFFLES];
    const scopes = isNotFirst ? subscriber : [Scope.ROOT, ...subscriber];

    const formatedEmail = email.toLowerCase();

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
