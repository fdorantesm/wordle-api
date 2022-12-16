import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { GetTopTenPlayersCommand } from './get-top-ten-players.command';
import { MatchesService } from 'src/modules/matches/infrastructure/database/services/matches.service';
import { BestPlayersType } from 'src/modules/tops/domain/types/best-players.type';

@CommandHandler(GetTopTenPlayersCommand)
export class GetTopTenPlayersCommandHandler
  implements ICommandHandler<GetTopTenPlayersCommand>
{
  constructor(private readonly matchesService: MatchesService) {}

  public async execute(
    _command: GetTopTenPlayersCommand,
  ): Promise<BestPlayersType> {
    const players = await this.matchesService.getTopTen();
    return players;
  }
}
