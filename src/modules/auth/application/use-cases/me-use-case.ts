import { Injectable } from '@nestjs/common';

import { UserEntity } from './../../../users/domain/entities/user.entity';
import { UsersService } from './../../../users/infrastructure/database/services/users.service';

@Injectable()
export class MeUseCase {
  constructor(private readonly usersService: UsersService) {}

  public async exec(userId: string): Promise<UserEntity> {
    const user = await this.usersService.findById(userId);
    return user;
  }
}
