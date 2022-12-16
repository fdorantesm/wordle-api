import { Module } from '@nestjs/common';

import { CoreModule } from '../../core/core.module';
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from '../health/health.module';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { WordsModule } from '../words/words.module';
import { MatchesModule } from '../matches/matches.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    HealthModule,
    AuthModule,
    UsersModule,
    WordsModule,
    MatchesModule,
    UserModule,
  ],
})
export class AppModule {}
