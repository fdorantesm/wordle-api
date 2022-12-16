import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { GetMatchesByUserCommand } from './get-matches-by-user.command';
import { MatchesService } from 'src/modules/matches/infrastructure/database/services/matches.service';
import { MatchEntity } from '../../entities/match.entity';

@CommandHandler(GetMatchesByUserCommand)
export class GetMatchesByUserCommandHandler
  implements ICommandHandler<GetMatchesByUserCommand>
{
  constructor(private readonly matchesService: MatchesService) {}
  public async execute(
    command: GetMatchesByUserCommand,
  ): Promise<MatchEntity[]> {
    const matches = await this.matchesService.find({ userId: command.userId });
    return matches;
  }
}
