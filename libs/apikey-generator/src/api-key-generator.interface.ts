import { ApiKeyPair } from './api-key-pair.type';

export const API_KEY_GENERATOR_SERVICE = 'ApiKeyGeneratorService';

export interface ApiKeyGeneratorService {
  generate(): ApiKeyPair;
  isApiKey(apiKey: string): boolean;
  check(key: string, uuid: string): boolean;
  toUuid(key: string): string;
}
