import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { IdGeneratorModule } from '@app/id-generator';

import { MatchesRepositoryDatabase } from './infrastructure/database/repositories/matches.repository-database';
import { MatchesService } from './infrastructure/database/services/matches.service';
import { MatchModelInstance } from './infrastructure/database/models/match.model';
import { CreateMatchUseCase } from './application/use-cases/create-match/create-match.use-case';
import { MatchesController } from './infrastructure/http/controllers/matches.controller';
import { SharedModule } from '../shared/shared.module';
import { MakeAttemptUseCase } from './application/use-cases/make-attempt/make-attempt.use-case';
import { AttemptModelInstance } from './infrastructure/database/models/attempt.model';
import { AttemptsService } from './infrastructure/database/services/attempts.service';
import { EventHandlers } from './domain/events';
import { CommandHandlers } from './domain/commands';
import { AttemptsRepositoryDatabase } from './infrastructure/database/repositories/attempts.repository-database';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([MatchModelInstance, AttemptModelInstance]),
    IdGeneratorModule,
    SharedModule,
  ],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    {
      provide: 'MatchesRepository',
      useClass: MatchesRepositoryDatabase,
    },
    {
      provide: 'AttemptsRepository',
      useClass: AttemptsRepositoryDatabase,
    },
    MatchesService,
    AttemptsService,
    CreateMatchUseCase,
    MakeAttemptUseCase,
  ],
  controllers: [MatchesController],
})
export class MatchesModule {}
