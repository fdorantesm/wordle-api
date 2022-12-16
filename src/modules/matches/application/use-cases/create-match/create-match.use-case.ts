import { ID_GENERATOR_SERVICE, IdGeneratorService } from '@app/id-generator';
import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UseCase } from 'libs/domain/src';
import { MatchEntity } from 'src/modules/matches/domain/entities/match.entity';
import { MatchesService } from 'src/modules/matches/infrastructure/database/services/matches.service';
import { CreateMatchResponseDto } from 'src/modules/matches/infrastructure/http/dtos/create-match.response-dto';
import { DateService } from 'src/modules/shared/services/date.service';
import { FindRandomWordCommand } from 'src/modules/words/domain/commands';
import { WordEntity } from 'src/modules/words/domain/entities/word.entity';

@Injectable()
export class CreateMatchUseCase implements UseCase {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly dateService: DateService,
    private readonly commandBus: CommandBus,
    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  public async run(userId: string): Promise<CreateMatchResponseDto> {
    const matchExists = await this.matchesService.findOne({ userId });

    if (matchExists) {
      return this.responsePartialEntity(matchExists);
    }

    const { word } = await this.commandBus.execute<
      FindRandomWordCommand,
      WordEntity
    >(new FindRandomWordCommand(5));

    const uuid = this.idGeneratorService.exec();
    const expiresAt = this.dateService.in(5, 'minutes');

    const match = await this.matchesService.create(
      MatchEntity.create({
        uuid,
        word,
        userId,
        expiresAt,
        intents: 0,
      }),
    );

    return this.responsePartialEntity(match);
  }

  private responsePartialEntity(entity: Partial<MatchEntity>) {
    return new CreateMatchResponseDto(entity.uuid, entity.expiresAt);
  }
}
