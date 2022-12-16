import { Injectable } from '@nestjs/common';

import { MatchesRepository } from '../repositories/matches.repository';
import { MatchEntity } from 'src/modules/matches/domain/entities/match.entity';
import { CrudRepository } from 'src/core/utils/crud-repository.interface';

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
}
