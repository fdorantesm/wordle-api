import { Json } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Instance } from 'src/core/application/models/instance';

@Schema({
  collection: 'attemps',
  timestamps: true,
  autoCreate: true,
  autoIndex: true,
})
export class AttemptModel extends Document {
  @Prop({ type: String, required: true })
  public uuid: string;

  @Prop({ type: String, required: true })
  public userWord: string;

  @Prop({ type: Number, required: true })
  public intentNumber: number;

  @Prop({ type: String, required: true })
  public userId: string;

  @Prop({ type: String, required: true })
  public matchId: string;

  @Prop({ type: Object, required: true })
  public result: Json;

  @Prop({ type: Boolean, required: true })
  public wordMatches: boolean;
}

const AttempSchema = SchemaFactory.createForClass(AttemptModel);

export const AttemptModelInstance: Instance = {
  name: AttemptModel.name,
  schema: AttempSchema,
};
