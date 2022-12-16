import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Scope } from '../../../domain/enums/scope.enum';

@Schema({
  collection: 'users',
  timestamps: true,
  autoIndex: true,
})
export class UserModel extends Document {
  @Prop({ type: String, unique: true })
  public uuid: string;

  @Prop({ type: String, unique: true })
  public email: string;

  @Prop({ type: String, select: false })
  public password: string;

  @Prop({ type: Array })
  public scopes: Scope[];

  @Prop({ type: Object })
  public profile?: {
    name: string;
    phone: string;
    age: number;
    weight: number;
    height: number;
    city: string;
    instagram: string;
    facebook: string;
    supplements: string;
    ailments: string;
    origin: string;
    exercise: string;
    food: string;
    modality: string;
    sex: string;
  };
}

const UserSchema = SchemaFactory.createForClass(UserModel);

export { UserSchema };
