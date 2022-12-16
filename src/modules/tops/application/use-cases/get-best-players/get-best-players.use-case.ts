import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UseCase } from 'libs/domain/src';

import { GetTopTenPlayersCommand } from 'src/modules/matches/domain/commands/get-top-ten-players/get-top-ten-players.command';

@Injectable()
export class GetBestPlayersUseCase implements UseCase {
  constructor(private readonly commandBus: CommandBus) {}
  public async run(): Promise<any> {
    const players = await this.commandBus.execute(
      new GetTopTenPlayersCommand(),
    );

    return players;
  }
}
