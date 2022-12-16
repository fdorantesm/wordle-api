import { Injectable } from '@nestjs/common';
import { Model, PipelineStage } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as first from 'lodash/first';

import { WordModel } from '../models/word.model';
import { WordEntity } from 'src/modules/words/domain/entities/word.entity';

@Injectable()
export class WordsRepository {
  constructor(
    @InjectModel(WordModel.name) private readonly wordModel: Model<WordModel>,
  ) {}

  public async findRandom(size?: number): Promise<WordEntity> {
    const pipes: PipelineStage[] = [
      {
        $project: {
          word: 1,
          length: { $strLenCP: '$word' },
        },
      },
    ];

    if (size) {
      pipes.push({
        $match: {
          length: {
            $eq: size,
          },
        },
      });
    }

    pipes.push({ $sample: { size: 1 } });

    const words = await this.wordModel
      .aggregate<WordModel>(pipes)
      .limit(1)
      .exec();
    if (words.length > 0) {
      return WordEntity.create(first(words));
    }
  }
}
