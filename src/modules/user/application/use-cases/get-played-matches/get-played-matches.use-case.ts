import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UseCase } from 'libs/domain/src';
import { GetMatchesByUserCommand } from 'src/modules/matches/domain/commands';
import { MatchEntity } from 'src/modules/matches/domain/entities/match.entity';
import { EndingStatus } from 'src/modules/matches/domain/enums/ending-status.enum';
import { PlayedMatches } from 'src/modules/user/domain/types/played-matches.type';

@Injectable()
export class GetPlayedMatchesUseCase implements UseCase {
  constructor(private readonly commandBus: CommandBus) {}
  public async run(userId): Promise<any> {
    const matches =
      (await this.commandBus.execute<GetMatchesByUserCommand, MatchEntity[]>(
        new GetMatchesByUserCommand(userId),
      )) || [];

    const wonMatches = matches.filter(
      (match) => match.endingStatus === EndingStatus.WIN,
    );
    const lostMatches = matches.filter(
      (match) =>
        !match.endingStatus || match.endingStatus === EndingStatus.LOST,
    );

    const score: PlayedMatches = {
      total: matches.length,
      lost: lostMatches.length,
      won: wonMatches.length,
    };

    return score;
  }
}
