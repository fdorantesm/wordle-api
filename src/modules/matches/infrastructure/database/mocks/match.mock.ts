import { MatchEntity } from 'src/modules/matches/domain/entities/match.entity';
import { DateService } from 'src/modules/shared/services/date.service';

const dateService = new DateService();

export const MatchMock = MatchEntity.create({
  uuid: '052dd1e0-7cab-4d65-90e3-5ce0dd8049ec',
  userId: '8e683b9e-20cd-4681-b918-e5171f114a3f',
  word: 'costa',
  intents: 0,
  expiresAt: dateService.in(5, 'minutes'),
});

export const MatchMock2 = MatchEntity.create({
  uuid: '055f23cb-a54c-44a4-a784-b228619798fa',
  userId: '8e683b9e-20cd-4681-b918-e5171f114a3f',
  word: 'marea',
  intents: 0,
  expiresAt: dateService.in(5, 'minutes'),
});

export const MatchesMock = [MatchMock, MatchMock2];
