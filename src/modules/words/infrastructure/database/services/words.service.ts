import { Inject, Injectable } from '@nestjs/common';

import { WordEntity } from 'src/modules/words/domain/entities/word.entity';
import { WordsRepository } from '../interfaces/word-repository.interface';

@Injectable()
export class WordsService {
  constructor(
    @Inject('WordsRepository')
    private readonly wordsRepository: WordsRepository,
  ) {}

  public findRandom(size?: number): Promise<WordEntity> {
    return this.wordsRepository.findRandom(size);
  }
}
