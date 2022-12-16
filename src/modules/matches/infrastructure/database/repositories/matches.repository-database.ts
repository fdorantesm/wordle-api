import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { MatchModel } from '../models/match.model';
import { MatchEntity } from 'src/modules/matches/domain/entities/match.entity';
import { CrudRepository } from 'src/core/utils/crud-repository.interface';
import { DateService } from 'src/modules/shared/services/date.service';
import { BestPlayersType } from 'src/modules/tops/domain/types/best-players.type';
import { BestPlayerResultItem } from 'src/modules/matches/domain/types/best-player-result.type';
import { BestPlayer } from 'src/modules/tops/domain/types/best-player.type';
import { EndingStatus } from 'src/modules/matches/domain/enums/ending-status.enum';
import { MostGuessedWordsResultItem } from 'src/modules/matches/domain/types/most-guessed-words-result.type';
import { MostGuessedWords } from 'src/modules/matches/domain/types/most-guessed-words.type';
import { MatchesRepository } from '../interfaces/matches-repository.interface';

@Injectable()
export class MatchesRepositoryDatabase
  implements CrudRepository<MatchEntity>, MatchesRepository
{
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

  public async getTopTen(): Promise<BestPlayersType> {
    const q = await this.matchModel
      .aggregate<BestPlayerResultItem>([
        { $match: { endingStatus: EndingStatus.WIN } },
        {
          $group: {
            _id: '$userId',
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: 'uuid',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        {
          $project: {
            nick: '$user.profile.nick',
            count: '$count',
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 10,
        },
      ])
      .exec();

    return q.map((row) => {
      return <BestPlayer>{
        nick: row.nick,
        wins: row.count,
      };
    });
  }

  public async mostGuessedWords(): Promise<MostGuessedWords> {
    const q = await this.matchModel
      .aggregate<MostGuessedWordsResultItem>([
        { $match: { endingStatus: EndingStatus.WIN } },
        {
          $group: {
            _id: '$word',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: false,
            word: '$_id',
            count: '$count',
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 10,
        },
      ])
      .exec();

    return q;
  }
}
