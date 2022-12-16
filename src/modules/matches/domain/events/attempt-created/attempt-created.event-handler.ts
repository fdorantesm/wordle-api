import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { AttemptCreatedEvent } from './attempt-created.event';
import { MatchesService } from 'src/modules/matches/infrastructure/database/services/matches.service';
import { EndingStatus } from '../../enums/ending-status.enum';
import { Logger } from '@nestjs/common';
import { AttemptEntity } from '../../entities/attempt.entity';
import { MatchEntity } from '../../entities/match.entity';

@EventsHandler(AttemptCreatedEvent)
export class AttemptCreatedEventHandler
  implements IEventHandler<AttemptCreatedEvent>
{
  constructor(private readonly matchesService: MatchesService) {}
  public async handle(event: AttemptCreatedEvent) {
    const { attempt, match, userId, userWord, intentNumber } = event;
    const wordMatches = userWord === match.word;
    const lastAttempt = intentNumber === 5;

    const filter = { uuid: match.uuid };
    const payload: Partial<MatchEntity> = {
      intents: intentNumber,
    };

    if (lastAttempt && !wordMatches) {
      payload.endingStatus = EndingStatus.LOST;
    }

    if (wordMatches) {
      payload.endingStatus = EndingStatus.WIN;
    }

    await this.matchesService.update(filter, payload);

    Logger.log(
      `Attempt ${attempt.intentNumber} |${userId} | ${attempt.userWord} | ${match.uuid} | ${match.word}`,
      AttemptCreatedEventHandler.name,
    );

    if (wordMatches) {
      Logger.log(`🏆 ${userId} wins`, AttemptCreatedEventHandler.name);
    }
  }
}
