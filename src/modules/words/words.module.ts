import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WordsService } from './infrastructure/database/services/words.service';
import { WordsRepository } from './infrastructure/database/repositories/words.repository';
import { WordModelInstance } from './infrastructure/database/models/word.model';
import { FindRandomWordUseCase } from './application/use-cases/find-random-word/find-random-word.use-case';
import { CommandHandlers } from './domain/commands';

@Module({
  imports: [MongooseModule.forFeature([WordModelInstance])],
  providers: [
    ...CommandHandlers,
    WordsRepository,
    WordsService,
    FindRandomWordUseCase,
  ],
})
export class WordsModule {}
