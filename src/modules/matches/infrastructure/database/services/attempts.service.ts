import { Injectable } from '@nestjs/common';

import { AttemptEntity } from 'src/modules/matches/domain/entities/attempt.entity';
import { AttemptsRepository } from '../repositories/attempts.repository';

@Injectable()
export class AttemptsService {
  constructor(private readonly attemptsRepository: AttemptsRepository) {}

  public create(data: AttemptEntity): Promise<AttemptEntity> {
    return this.attemptsRepository.create(data);
  }

  public countAttempsByMatchId(matchId: string): Promise<number> {
    return this.attemptsRepository.countAttempsByMatchId(matchId);
  }
}
