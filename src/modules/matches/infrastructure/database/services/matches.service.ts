import { Injectable } from '@nestjs/common';

import { MatchesRepository } from '../repositories/matches.repository';
import { MatchEntity } from 'src/modules/matches/domain/entities/match.entity';
import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { BestPlayersType } from 'src/modules/tops/domain/types/best-players.type';
import { MostGuessedWordsResultItem } from 'src/modules/matches/domain/types/most-guessed-words-result.type';
import { MostGuessedWords } from 'src/modules/matches/domain/types/most-guessed-words.type';

@Injectable()
export class MatchesService implements CrudRepository<MatchEntity> {
  constructor(private readonly matchesRepository: MatchesRepository) {}

  public create(data: MatchEntity): MatchEntity | Promise<MatchEntity> {
    return this.matchesRepository.create(data);
  }

  public find(
    filter: Partial<MatchEntity>,
  ): MatchEntity[] | Promise<MatchEntity[]> {
    return this.matchesRepository.find(filter);
  }

  public findOne(
    filter: Partial<MatchEntity>,
  ): MatchEntity | Promise<MatchEntity> {
    return this.matchesRepository.findOne(filter);
  }

  public update(
    filter: Partial<MatchEntity>,
    data: Partial<MatchEntity>,
  ): MatchEntity | Promise<MatchEntity> {
    return this.matchesRepository.update(filter, data);
  }

  public delete(filter: Partial<MatchEntity>): Promise<boolean> {
    return this.matchesRepository.delete(filter);
  }

  public getTopTen(): Promise<BestPlayersType> {
    return this.matchesRepository.getTopTen();
  }

  public mostGuessedWords(): Promise<MostGuessedWords> {
    return this.matchesRepository.mostGuessedWords();
  }
}
