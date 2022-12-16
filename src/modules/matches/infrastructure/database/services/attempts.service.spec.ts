import { Test, TestingModule } from '@nestjs/testing';
import { AttemptMock } from '../mocks/attempt.mock';
import { AttemptsRepositoryMemory } from '../repositories/attempts.repository-memory';

import { AttemptsService } from './attempts.service';

describe('AttemptsService', () => {
  let service: AttemptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttemptsService,
        {
          provide: 'AttemptsRepository',
          useClass: AttemptsRepositoryMemory,
        },
      ],
    }).compile();

    service = module.get<AttemptsService>(AttemptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an attempt', async () => {
    const attempt = await service.create(AttemptMock);
    expect(attempt.uuid).toBe(AttemptMock.uuid);
    expect(attempt.matchId).toBe(AttemptMock.matchId);
    expect(attempt.userId).toBe(AttemptMock.userId);
    expect(attempt.intentNumber).toBe(AttemptMock.intentNumber);
    expect(attempt.result).toBe(AttemptMock.result);
    expect(attempt.userWord).toBe(AttemptMock.userWord);
    expect(attempt.wordMatches).toBe(AttemptMock.wordMatches);
  });

  it('should return attempts count', async () => {
    const count = await service.countAttempsByMatchId(AttemptMock.matchId);
    expect(typeof count).toBe('number');
  });
});
