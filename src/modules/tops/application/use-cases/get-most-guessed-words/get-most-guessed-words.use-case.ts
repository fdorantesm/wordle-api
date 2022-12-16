import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UseCase } from 'libs/domain/src';
import { GetMostGuessedWordsCommand } from 'src/modules/matches/domain/commands/get-most-guessed-words/get-most-guessed-words.command';
import { MostGuessedWords } from 'src/modules/matches/domain/types/most-guessed-words.type';

@Injectable()
export class GetMostGuessedWordsUseCase implements UseCase {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(): Promise<MostGuessedWords> {
    return this.commandBus.execute(new GetMostGuessedWordsCommand());
  }
}
