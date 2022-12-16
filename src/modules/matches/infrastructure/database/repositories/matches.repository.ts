import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as first from 'lodash/first';

import { MatchModel } from '../models/match.model';
import { MatchEntity } from 'src/modules/matches/domain/entities/match.entity';
import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { DateService } from 'src/modules/shared/services/date.service';

@Injectable()
export class MatchesRepository implements CrudRepository<MatchEntity> {
  constructor(
    @InjectModel(MatchModel.name)
    private readonly matchModel: Model<MatchModel>,
    private readonly dateService: DateService,
  ) {}
  public async create(data: MatchEntity): Promise<MatchEntity> {
    const match = await this.matchModel.create(data);
    if (match) {
      return MatchEntity.create(match);
    }
  }

  public async find(filter: Partial<MatchEntity>): Promise<MatchEntity[]> {
    const matches = await this.matchModel.find(filter).exec();
    if (matches.length > 0) {
      return matches.map(MatchEntity.create);
    }
  }

  public async findOne(filter: Partial<MatchEntity>): Promise<MatchEntity> {
    const { from, to } = this.dateService.withinRange(5, 'minutes');
    const match = await this.matchModel
      .findOne(filter)
      .sort({ createdAt: -1 })
      .where('expiresAt', {
        $gt: from,
        $lte: to,
      })
      .exec();
    if (match) {
      return MatchEntity.create(match);
    }
  }

  public async update(
    filter: Partial<MatchEntity>,
    data: Partial<MatchEntity>,
  ): Promise<MatchEntity> {
    await this.matchModel.updateOne(filter, data).exec();
    return this.findOne(filter);
  }

  public async delete(filter: Partial<MatchEntity>): Promise<boolean> {
    const q = await this.matchModel.deleteOne(filter).exec();
    return q.deletedCount > 0;
  }
}
