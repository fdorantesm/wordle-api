import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WordsService } from './infrastructure/database/services/words.service';
import { WordModelInstance } from './infrastructure/database/models/word.model';
import { FindRandomWordUseCase } from './application/use-cases/find-random-word/find-random-word.use-case';
import { CommandHandlers } from './domain/commands';
import { WordsRepositoryDatabase } from './infrastructure/database/repositories/words.repository';

@Module({
  imports: [MongooseModule.forFeature([WordModelInstance])],
  providers: [
    ...CommandHandlers,
    {
      provide: 'WordsRepository',
      useClass: WordsRepositoryDatabase,
    },
    WordsService,
    FindRandomWordUseCase,
  ],
})
export class WordsModule {}
