import { MatchEntity } from 'src/modules/matches/domain/entities/match.entity';
import { MostGuessedWords } from 'src/modules/matches/domain/types/most-guessed-words.type';
import { BestPlayersType } from 'src/modules/tops/domain/types/best-players.type';

export interface MatchesRepository {
  create(data: MatchEntity): Promise<MatchEntity>;
  find(filter: Partial<MatchEntity>): Promise<MatchEntity[]>;
  findOne(filter: Partial<MatchEntity>): Promise<MatchEntity>;
  update(filter: Partial<MatchEntity>, data: Partial<MatchEntity>);
  delete(filter: Partial<MatchEntity>): Promise<boolean>;
  getTopTen(): Promise<BestPlayersType>;
  mostGuessedWords(): Promise<MostGuessedWords>;
}
