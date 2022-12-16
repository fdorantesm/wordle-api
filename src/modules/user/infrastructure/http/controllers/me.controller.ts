import { UserRequest } from '@app/common/types/http/user-request.type';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import { JwtGuard } from 'src/modules/auth/application/guards/jwt.guard';
import { ScopeGuard } from 'src/modules/auth/application/guards/scope.guard';

import { GetPlayedMatchesUseCase } from 'src/modules/user/application/use-cases/get-played-matches/get-played-matches.use-case';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';

@Controller({ version: '1', path: 'me' })
export class MeController {
  constructor(
    private readonly getPlayedMatchesUseCase: GetPlayedMatchesUseCase,
  ) {}

  @Get('/matches')
  @Scopes(Scope.MATCHES)
  @UseGuards(JwtGuard, ScopeGuard)
  public getPlayedMatches(@Req() req: UserRequest) {
    return this.getPlayedMatchesUseCase.run(req.user.id);
  }
}
