import { Injectable } from '@nestjs/common';
import * as utility from 'utility';

@Injectable()
export class ShortIdService {
  public exec(
    length = 8,
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ): string {
    return utility.randomString(length, chars);
  }
}
