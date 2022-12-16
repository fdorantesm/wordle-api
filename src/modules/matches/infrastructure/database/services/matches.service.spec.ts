import { Test, TestingModule } from '@nestjs/testing';

import { MatchMock } from '../mocks/match.mock';
import { MostGuessedWordsMock } from '../mocks/most-guessed-word.mock';
import { TopTenMock } from '../mocks/top-ten.mock';
import { MatchesRepositoryMemory } from '../repositories/matches.repository.memory';
import { MatchesService } from './matches.service';

describe('MatchesService', () => {
  let service: MatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchesService,
        {
          provide: 'MatchesRepository',
          useClass: MatchesRepositoryMemory,
        },
      ],
    }).compile();

    service = module.get<MatchesService>(MatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a match', async () => {
    const match = await service.create(MatchMock);
    expect(match.uuid).toBe(MatchMock.uuid);
    expect(match.userId).toBe(MatchMock.userId);
    expect(match.word).toBe(MatchMock.word);
    expect(match.intents).toBe(MatchMock.intents);
    expect(match.expiresAt).toBe(MatchMock.expiresAt);
  });

  it('should return a list of matches', async () => {
    const matches = await service.find({});
    expect(matches.length).toBe(2);
  });

  it('should return a list of matches', async () => {
    const uuid = MatchMock.uuid;
    const match = await service.findOne({
      uuid,
    });
    expect(match.uuid).toBe(uuid);
  });

  it('should return the top ten players', async () => {
    const top = await service.getTopTen();
    expect(top.length).toBe(10);
    expect(top[0].nick).toBe(TopTenMock[0].nick);
    top.map((t) => expect(t.wins).toBeGreaterThan(0));
  });

  it('should return the 5 most guessed words', async () => {
    const top = await service.mostGuessedWords();
    expect(top.length).toBe(5);
    top.map((t) => expect(t.count).toBeGreaterThan(0));
    expect(top[0].word).toBe(MostGuessedWordsMock[0].word);
    expect(top[0].count).toBe(MostGuessedWordsMock[0].count);
  });
});
