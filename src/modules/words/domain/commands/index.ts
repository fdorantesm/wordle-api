import { FindRandomWordCommandHandler } from './find-random-word/find-random-word.command-handler';

export * from './find-random-word/find-random-word.command';
export * from './find-random-word/find-random-word.command-handler';

export const CommandHandlers = [FindRandomWordCommandHandler];
