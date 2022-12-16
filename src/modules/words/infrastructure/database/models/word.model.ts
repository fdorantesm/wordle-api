import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Instance } from 'src/core/application/models/instance';

@Schema({
  collection: 'words',
  autoCreate: true,
})
export class WordModel extends Document {
  public uuid: string;
  public word: string;
}

export const WordSchema = SchemaFactory.createForClass(WordModel);

export const WordModelInstance: Instance = {
  name: WordModel.name,
  schema: WordSchema,
};
