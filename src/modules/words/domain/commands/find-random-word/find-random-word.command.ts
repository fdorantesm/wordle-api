import { ICommand } from '@nestjs/cqrs';

export class FindRandomWordCommand implements ICommand {
  constructor(public size?: number) {}
}
