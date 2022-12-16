import { UserEntity } from './../../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

import { UsersService } from '../../../infrastructure/database/services/users.service';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly UsersService: UsersService) {}

  public async exec(filter: Partial<UserEntity>) {
    const users = this.UsersService.findCustomers(filter);
    return users;
  }
}
