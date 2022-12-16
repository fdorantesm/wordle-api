import { MatchEntity } from 'src/modules/matches/domain/entities/match.entity';
import { MostGuessedWords } from 'src/modules/matches/domain/types/most-guessed-words.type';
import { BestPlayersType } from 'src/modules/tops/domain/types/best-players.type';
import { MatchesRepository } from '../interfaces/matches-repository.interface';
import { MatchesMock, MatchMock } from '../mocks/match.mock';
import { MostGuessedWordsMock } from '../mocks/most-guessed-word.mock';
import { TopTenMock } from '../mocks/top-ten.mock';

export class MatchesRepositoryMemory implements MatchesRepository {
  public async create(data: MatchEntity): Promise<MatchEntity> {
    return MatchEntity.create(data);
  }

  public async find(_filter: Partial<MatchEntity>): Promise<MatchEntity[]> {
    return MatchesMock;
  }

  public async findOne(_filter: Partial<MatchEntity>): Promise<MatchEntity> {
    return MatchMock;
  }

  public async update() {
    return MatchMock;
  }

  public async delete(filter: Partial<MatchEntity>): Promise<boolean> {
    return Promise.resolve(true);
  }

  public async getTopTen(): Promise<BestPlayersType> {
    return Promise.resolve(TopTenMock);
  }

  public async mostGuessedWords(): Promise<MostGuessedWords> {
    return Promise.resolve(MostGuessedWordsMock);
  }
}
