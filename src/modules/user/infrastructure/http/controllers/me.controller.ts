import { UserRequest } from '@app/common/types/http/user-request.type';
import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import { JwtGuard } from 'src/modules/auth/application/guards/jwt.guard';
import { ScopeGuard } from 'src/modules/auth/application/guards/scope.guard';

import { GetPlayedMatchesUseCase } from 'src/modules/user/application/use-cases/get-played-matches/get-played-matches.use-case';
import { PlayedMatches } from 'src/modules/user/domain/types/played-matches.type';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';

@ApiTags('User')
@Controller({ version: '1', path: 'me' })
export class MeController {
  constructor(
    private readonly getPlayedMatchesUseCase: GetPlayedMatchesUseCase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my matches' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns gaming score',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired token',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @Get('/matches')
  @Scopes(Scope.MATCHES)
  @UseGuards(JwtGuard, ScopeGuard)
  public getPlayedMatches(@Req() req: UserRequest): Promise<PlayedMatches> {
    return this.getPlayedMatchesUseCase.run(req.user.id);
  }
}
