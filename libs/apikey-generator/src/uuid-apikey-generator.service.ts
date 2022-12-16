import { Injectable } from '@nestjs/common';
const uuidApiKey = require('uuid-apikey');

import { ApiKeyGeneratorService } from './api-key-generator.interface';
import { ApiKeyPair } from './api-key-pair.type';

@Injectable()
export class UuidApikeyGeneratorService implements ApiKeyGeneratorService {
  public generate(): ApiKeyPair {
    const pair = uuidApiKey.create();
    return {
      uuid: pair.uuid,
      key: pair.apiKey,
    };
  }

  public isApiKey(apiKey: string): boolean {
    return uuidApiKey.isAPIKey(apiKey);
  }

  public check(key: string, uuid: string): boolean {
    return uuidApiKey.check(key, uuid);
  }

  public toUuid(key: string): string {
    return uuidApiKey.toUUID(key);
  }
}
