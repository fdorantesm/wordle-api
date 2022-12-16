import { ID_GENERATOR_SERVICE, IdGeneratorService } from '@app/id-generator';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { UseCase } from 'libs/domain/src';
import { AttemptEntity } from 'src/modules/matches/domain/entities/attempt.entity';
import { LetterScore } from 'src/modules/matches/domain/enums/letter-score.enum';
import { AttemptCreatedEvent } from 'src/modules/matches/domain/events';
import { LetterResult } from 'src/modules/matches/domain/types/letter-result.type';
import { AttemptsService } from 'src/modules/matches/infrastructure/database/services/attempts.service';
import { MatchesService } from 'src/modules/matches/infrastructure/database/services/matches.service';
import { SlugService } from 'src/modules/shared/services/slug.service';

@Injectable()
export class MakeAttemptUseCase implements UseCase {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly attemptsService: AttemptsService,
    private readonly slugService: SlugService,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
    private readonly eventBus: EventBus,
  ) {}
  public async run(
    userId: string,
    matchId: string,
    userWord: string,
  ): Promise<any> {
    const match = await this.matchesService.findOne({
      userId,
      uuid: matchId,
    });

    if (!match) {
      throw new NotFoundException('match.not_found');
    }

    if (match.endingStatus) {
      throw new ConflictException('match.finished');
    }

    const attemps = await this.attemptsService.countAttempsByMatchId(matchId);
    const secretWordLetters = this.slugService.exec(match.word).split('');
    const userWordLetters = this.slugService.exec(userWord).split('');

    const result = userWordLetters.map((letter, index) => {
      const result: Partial<LetterResult> = { letter };
      if (letter === secretWordLetters[index]) {
        return {
          ...result,
          value: LetterScore.EXACT,
        };
      } else if (secretWordLetters.includes(letter)) {
        return {
          ...result,
          value: LetterScore.EXISTS,
        };
      } else {
        return {
          ...result,
          value: LetterScore.DOESNT_EXIST,
        };
      }
    });

    const attemptUuid = this.idGeneratorService.exec();
    const intentNumber = attemps + 1;
    const wordMatches = userWord === match.word;

    const attemptEntity = AttemptEntity.create({
      matchId,
      result,
      userId,
      userWord,
      wordMatches,
      intentNumber,
      uuid: attemptUuid,
    });

    await this.attemptsService.create(attemptEntity);

    this.eventBus.publish(
      new AttemptCreatedEvent(
        attemptEntity,
        userId,
        match,
        userWord,
        intentNumber,
      ),
    );

    return attemptEntity;
  }
}
