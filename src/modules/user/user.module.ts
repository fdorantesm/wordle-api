import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { GetPlayedMatchesUseCase } from './application/use-cases/get-played-matches/get-played-matches.use-case';
import { MeController } from './infrastructure/http/controllers/me.controller';

@Module({
  imports: [CqrsModule],
  providers: [GetPlayedMatchesUseCase],
  controllers: [MeController],
})
export class UserModule {}
