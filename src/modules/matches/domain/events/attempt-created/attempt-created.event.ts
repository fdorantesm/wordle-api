import { IEvent } from '@nestjs/cqrs';

import { AttemptEntity } from '../../entities/attempt.entity';
import { MatchEntity } from '../../entities/match.entity';

export class AttemptCreatedEvent implements IEvent {
  constructor(
    public readonly attempt: AttemptEntity,
    public readonly userId: string,
    public readonly match: MatchEntity,
    public readonly userWord: string,
    public readonly intentNumber: number,
  ) {}
}
