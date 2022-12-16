import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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

  @Get('/best-players')
  @Scopes(Scope.ROOT, Scope.TOPS)
  @UseGuards(JwtGuard, ScopeGuard)
  public getTopTen() {
    return this.getBestPlayersUseCase.run();
  }

  @Get('/most-guessed')
  @Scopes(Scope.ROOT, Scope.TOPS)
  @UseGuards(JwtGuard, ScopeGuard)
  public mostGuessedWords() {
    return this.getMostGuessedWordsUseCase.run();
  }
}
