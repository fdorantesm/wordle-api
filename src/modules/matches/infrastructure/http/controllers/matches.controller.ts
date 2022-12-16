import { UserRequest } from '@app/common/types/http/user-request.type';
import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';

import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import { JwtGuard } from 'src/modules/auth/application/guards/jwt.guard';
import { ScopeGuard } from 'src/modules/auth/application/guards/scope.guard';
import { CreateMatchUseCase } from 'src/modules/matches/application/use-cases/create-match/create-match.use-case';
import { MakeAttemptUseCase } from 'src/modules/matches/application/use-cases/make-attempt/make-attempt.use-case';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { MakeAttemptDto } from '../dtos/make-attempt.dto';

@Controller({ version: '1', path: 'matches' })
export class MatchesController {
  constructor(
    private readonly createMatchUseCase: CreateMatchUseCase,
    private readonly makeAttemptUseCase: MakeAttemptUseCase,
  ) {}

  @Post('/')
  @Scopes(Scope.MATCHES)
  @UseGuards(JwtGuard, ScopeGuard)
  public createMatch(@Req() req: UserRequest) {
    return this.createMatchUseCase.run(req.user.id);
  }

  @Post('/:uuid/attempts')
  @Scopes(Scope.MATCHES)
  @UseGuards(JwtGuard, ScopeGuard)
  public makeAttempt(
    @Param('uuid') uuid: string,
    @Req() req: UserRequest,
    @Body() body: MakeAttemptDto,
  ) {
    return this.makeAttemptUseCase.run(req.user.id, uuid, body.word);
  }
}
