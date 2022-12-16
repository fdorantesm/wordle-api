import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
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
import { GetBestPlayersUseCase } from 'src/modules/tops/application/use-cases/get-best-players/get-best-players.use-case';
import { GetMostGuessedWordsUseCase } from 'src/modules/tops/application/use-cases/get-most-guessed-words/get-most-guessed-words.use-case';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';

@ApiTags('Tops')
@Controller({
  version: '1',
  path: 'tops',
})
export class TopsController {
  constructor(
    private readonly getBestPlayersUseCase: GetBestPlayersUseCase,
    private readonly getMostGuessedWordsUseCase: GetMostGuessedWordsUseCase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Returns the Top 10 winner players' })
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
  @Get('/best-players')
  @Scopes(Scope.ROOT, Scope.TOPS)
  @UseGuards(JwtGuard, ScopeGuard)
  public getTopTen() {
    return this.getBestPlayersUseCase.run();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Returns the 10 most guessed words' })
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
  @Get('/most-guessed')
  @Scopes(Scope.ROOT, Scope.TOPS)
  @UseGuards(JwtGuard, ScopeGuard)
  public mostGuessedWords() {
    return this.getMostGuessedWordsUseCase.run();
  }
}
