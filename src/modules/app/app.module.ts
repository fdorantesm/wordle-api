import { Module } from '@nestjs/common';

import { CoreModule } from '../../core/core.module';
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from '../health/health.module';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { WordsModule } from '../words/words.module';
import { TopsModule } from '../tops/tops.module';
import { MatchesModule } from '../matches/matches.module';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    SharedModule,
    HealthModule,
    AuthModule,
    UsersModule,
    WordsModule,
    MatchesModule,
    UserModule,
    TopsModule,
  ],
})
export class AppModule {}
