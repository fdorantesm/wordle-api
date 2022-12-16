import { Injectable } from '@nestjs/common';

import { UseCase } from 'libs/domain/src';
import { WordEntity } from 'src/modules/words/domain/entities/word.entity';
import { WordsService } from 'src/modules/words/infrastructure/database/services/words.service';

@Injectable()
export class FindRandomWordUseCase implements UseCase {
  constructor(private readonly wordsService: WordsService) {}
  public async run(): Promise<WordEntity> {
    const word = this.wordsService.findRandom();
    return word;
  }
}
