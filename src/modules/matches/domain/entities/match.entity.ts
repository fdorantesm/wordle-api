import { EndingStatus } from '../enums/ending-status.enum';

export class MatchEntity {
  public uuid: string;
  public word: string;
  public intents: number;
  public userId: string;
  public expiresAt: Date;
  public endingStatus: EndingStatus;

  constructor(payload: MatchEntityPaylod) {
    this.uuid = payload.uuid;
    this.word = payload.word;
    this.intents = payload.intents;
    this.userId = payload.userId;
    this.expiresAt = payload.expiresAt;
    this.endingStatus = payload.endingStatus;
  }

  static create(payload: MatchEntityPaylod): MatchEntity {
    return new MatchEntity(payload);
  }
}

type MatchEntityPaylod = {
  uuid: string;
  word: string;
  intents: number;
  userId: string;
  expiresAt: Date;
  endingStatus?: EndingStatus;
};
