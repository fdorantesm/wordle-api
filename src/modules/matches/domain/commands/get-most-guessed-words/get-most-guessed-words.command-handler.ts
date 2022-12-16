import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { GetMostGuessedWordsCommand } from './get-most-guessed-words.command';
import { MatchesService } from 'src/modules/matches/infrastructure/database/services/matches.service';
import { MostGuessedWords } from '../../types/most-guessed-words.type';

@CommandHandler(GetMostGuessedWordsCommand)
export class GetMostGuessedWordsCommandHandler
  implements ICommandHandler<GetMostGuessedWordsCommand>
{
  constructor(private readonly matchesService: MatchesService) {}
  public async execute(
    _command: GetMostGuessedWordsCommand,
  ): Promise<MostGuessedWords> {
    return this.matchesService.mostGuessedWords();
  }
}
