import { AttemptEntity } from 'src/modules/matches/domain/entities/attempt.entity';

export interface AttemptsRepository {
  create(data: AttemptEntity): Promise<AttemptEntity>;
  countAttempsByMatchId(matchId: string): Promise<number>;
}
