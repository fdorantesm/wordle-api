import { Injectable } from '@nestjs/common';
import * as sample from 'lodash/sample';

import { WordEntity } from 'src/modules/words/domain/entities/word.entity';
import { WordsRepository } from '../interfaces/word-repository.interface';

@Injectable()
export class WordsRepositoryMemory implements WordsRepository {
  findRandom(): Promise<WordEntity> {
    return Promise.resolve(
      WordEntity.create({
        uuid: '8923e6d4-e36d-4b40-9f1e-68d13a6fb5c6',
        word: sample(['cosas', 'casos', 'mosca', 'perro']),
      }),
    );
  }
}
