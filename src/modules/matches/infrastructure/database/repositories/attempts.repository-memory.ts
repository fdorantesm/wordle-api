import { Injectable } from '@nestjs/common';

import { AttemptEntity } from 'src/modules/matches/domain/entities/attempt.entity';
import { AttemptsRepository } from '../interfaces/attemps-repository.interface';
import { AttemptMock } from '../mocks/attempt.mock';

@Injectable()
export class AttemptsRepositoryMemory implements AttemptsRepository {
  public async create(data: AttemptEntity): Promise<AttemptEntity> {
    const attempt = AttemptEntity.create(AttemptMock);

    return attempt;
  }

  public countAttempsByMatchId(matchId: string): Promise<number> {
    return Promise.resolve(0);
  }
}
