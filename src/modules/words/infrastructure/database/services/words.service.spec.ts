import { Test, TestingModule } from '@nestjs/testing';

import { WordsRepositoryMemory } from '../repositories/words.repository.memory';
import { WordsService } from './words.service';

describe('WordsService', () => {
  let service: WordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WordsService,
        {
          provide: 'WordsRepository',
          useClass: WordsRepositoryMemory,
        },
      ],
    }).compile();

    service = module.get<WordsService>(WordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get random word', async () => {
    const { word } = await service.findRandom(5);
    expect(word).toBeTruthy();
    expect(word.length).toBe(5);
  });
});
