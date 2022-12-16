import { GetMatchesByUserCommandHandler } from './get-matches-by-user/get-matches-by-user.command-handler';

export * from './get-matches-by-user/get-matches-by-user.command';
export * from './get-matches-by-user/get-matches-by-user.command-handler';

export const CommandHandlers = [GetMatchesByUserCommandHandler];
