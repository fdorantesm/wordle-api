export class WordEntity {
  public uuid: string;
  public word: string;

  constructor(payload: WordEntityPaylod) {
    this.uuid = payload.uuid;
    this.word = payload.word;
  }

  static create(payload: WordEntityPaylod): WordEntity {
    return new WordEntity(payload);
  }
}

type WordEntityPaylod = {
  uuid: string;
  word: string;
};
