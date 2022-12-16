import { Json } from '@app/common';

export class AttemptEntity {
  public uuid: string;
  public userWord: string;
  public intentNumber: number;
  public userId: string;
  public matchId: string;
  public result: Json;
  public wordMatches: boolean;

  constructor(payload: AttemptEntityPaylod) {
    this.uuid = payload.uuid;
    this.userWord = payload.userWord;
    this.intentNumber = payload.intentNumber;
    this.userId = payload.userId;
    this.matchId = payload.matchId;
    this.result = payload.result;
    this.wordMatches = payload.wordMatches;
  }

  static create(payload: AttemptEntityPaylod): AttemptEntity {
    return new AttemptEntity(payload);
  }
}

type AttemptEntityPaylod = {
  uuid: string;
  userWord: string;
  intentNumber: number;
  userId: string;
  matchId: string;
  result: Json;
  wordMatches: boolean;
};
