import { Injectable } from '@nestjs/common';
import { WordEntity } from 'src/modules/words/domain/entities/word.entity';
import { WordsRepository } from '../repositories/words.repository';

@Injectable()
export class WordsService {
  constructor(private readonly wordsRepository: WordsRepository) {}

  public findRandom(size?: number): Promise<WordEntity> {
    return this.wordsRepository.findRandom(size);
  }
}
