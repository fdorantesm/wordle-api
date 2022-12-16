import { Inject, Injectable } from '@nestjs/common';

import { MatchEntity } from 'src/modules/matches/domain/entities/match.entity';
import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { BestPlayersType } from 'src/modules/tops/domain/types/best-players.type';
import { MostGuessedWords } from 'src/modules/matches/domain/types/most-guessed-words.type';
import { MatchesRepository } from '../interfaces/matches-repository.interface';

@Injectable()
export class MatchesService implements CrudRepository<MatchEntity> {
  constructor(
    @Inject('MatchesRepository')
    private readonly matchesRepository: MatchesRepository,
  ) {}

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
