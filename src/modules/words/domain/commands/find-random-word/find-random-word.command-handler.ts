import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FindRandomWordCommand } from './find-random-word.command';
import { WordEntity } from '../../entities/word.entity';
import { FindRandomWordUseCase } from 'src/modules/words/application/use-cases/find-random-word/find-random-word.use-case';

@CommandHandler(FindRandomWordCommand)
export class FindRandomWordCommandHandler
  implements ICommandHandler<FindRandomWordCommand>
{
  constructor(private readonly useCase: FindRandomWordUseCase) {}
  public async execute(command: FindRandomWordCommand): Promise<WordEntity> {
    return this.useCase.run(command.size);
  }
}
