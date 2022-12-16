import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TopsController } from './infrastructure/http/controllers/tops.controller';
import { GetBestPlayersUseCase } from './application/use-cases/get-best-players/get-best-players.use-case';
import { GetMostGuessedWordsUseCase } from './application/use-cases/get-most-guessed-words/get-most-guessed-words.use-case';

@Module({
  imports: [CqrsModule],
  providers: [GetBestPlayersUseCase, GetMostGuessedWordsUseCase],
  controllers: [TopsController],
})
export class TopsModule {}
