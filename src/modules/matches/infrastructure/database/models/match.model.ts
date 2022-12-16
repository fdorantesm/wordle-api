import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Instance } from 'src/core/application/models/instance';
import { EndingStatus } from 'src/modules/matches/domain/enums/ending-status.enum';

@Schema({
  collection: 'matches',
  autoCreate: true,
  timestamps: true,
  autoIndex: true,
})
export class MatchModel extends Document {
  @Prop({ type: String, required: true })
  public uuid: string;

  @Prop({ type: String, required: true })
  public word: string;

  @Prop({ type: Number, required: true })
  public intents: number;

  @Prop({ type: String, required: true })
  public userId: string;

  @Prop({ type: Date, required: true })
  public expiresAt: Date;

  @Prop({ type: String, enum: EndingStatus })
  public endingStatus: EndingStatus;
}

export const MatchSchema = SchemaFactory.createForClass(MatchModel);

export const MatchModelInstance: Instance = {
  name: MatchModel.name,
  schema: MatchSchema,
};
