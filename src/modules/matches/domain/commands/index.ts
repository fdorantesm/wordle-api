import { GetMatchesByUserCommandHandler } from './get-matches-by-user/get-matches-by-user.command-handler';
import { GetMostGuessedWordsCommandHandler } from './get-most-guessed-words/get-most-guessed-words.command-handler';
import { GetTopTenPlayersCommandHandler } from './get-top-ten-players/get-top-ten-players.command-handler';

export * from './get-matches-by-user/get-matches-by-user.command';
export * from './get-top-ten-players/get-top-ten-players.command';
export * from './get-matches-by-user/get-matches-by-user.command-handler';
export * from './get-top-ten-players/get-top-ten-players.command-handler';

export const CommandHandlers = [
  GetMatchesByUserCommandHandler,
  GetTopTenPlayersCommandHandler,
  GetMostGuessedWordsCommandHandler,
];
