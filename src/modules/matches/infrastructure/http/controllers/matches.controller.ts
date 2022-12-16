import { UserRequest } from '@app/common/types/http/user-request.type';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import { JwtGuard } from 'src/modules/auth/application/guards/jwt.guard';
import { ScopeGuard } from 'src/modules/auth/application/guards/scope.guard';
import { CreateMatchUseCase } from 'src/modules/matches/application/use-cases/create-match/create-match.use-case';
import { MakeAttemptUseCase } from 'src/modules/matches/application/use-cases/make-attempt/make-attempt.use-case';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { MakeAttemptDto } from '../dtos/make-attempt.dto';

@ApiTags('Matches')
@Controller({ version: '1', path: 'matches' })
export class MatchesController {
  constructor(
    private readonly createMatchUseCase: CreateMatchUseCase,
    private readonly makeAttemptUseCase: MakeAttemptUseCase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create or get active match' })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired token',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @Post('/')
  @Scopes(Scope.MATCHES)
  @UseGuards(JwtGuard, ScopeGuard)
  public createMatch(@Req() req: UserRequest) {
    return this.createMatchUseCase.run(req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Make an attempt to guess the match word' })
  @ApiParam({
    name: 'uuid',
    example: '2c13d8a6-b11b-4300-840c-7f2d52d958b7',
    description: 'Match uuid',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired token',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
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
