import { ICommand } from '@nestjs/cqrs';

import { EndingStatus } from '../../enums/ending-status.enum';

export class GetMatchesByUserCommand implements ICommand {
  constructor(public userId: string, public endingStatus?: EndingStatus) {}
}
