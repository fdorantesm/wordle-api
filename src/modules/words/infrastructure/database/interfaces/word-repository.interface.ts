import { WordEntity } from 'src/modules/words/domain/entities/word.entity';

export interface WordsRepository {
  findRandom(size?: number): Promise<WordEntity>;
}
