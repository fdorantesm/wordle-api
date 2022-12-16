import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AttemptModel } from '../models/attempt.model';
import { AttemptEntity } from 'src/modules/matches/domain/entities/attempt.entity';
import { AttemptsRepository } from '../interfaces/attemps-repository.interface';

@Injectable()
export class AttemptsRepositoryDatabase implements AttemptsRepository {
  constructor(
    @InjectModel(AttemptModel.name)
    public readonly attemptModel: Model<AttemptModel>,
  ) {}

  public async create(data: AttemptEntity): Promise<AttemptEntity> {
    const attemp = await this.attemptModel.create(data);
    if (attemp) {
      return AttemptEntity.create(attemp);
    }
  }

  public countAttempsByMatchId(matchId: string): Promise<number> {
    return this.attemptModel.countDocuments({ matchId }).exec();
  }
}
