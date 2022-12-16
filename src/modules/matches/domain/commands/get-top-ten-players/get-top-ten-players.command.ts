import { ICommand } from '@nestjs/cqrs';

export class GetTopTenPlayersCommand implements ICommand {
  constructor() {}
}
