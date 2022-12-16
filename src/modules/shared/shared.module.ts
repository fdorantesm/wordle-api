import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { emailConfigLoader } from './../../core/infrastructure/config/loaders/email.loader';
import { ShortIdService } from './services/short-id.service';
import { DateService } from './services/date.service';
import { SlugService } from './services/slug.service';

@Module({
  imports: [ConfigModule.forFeature(emailConfigLoader)],
  providers: [ShortIdService, DateService, SlugService],
  exports: [ShortIdService, DateService, SlugService],
})
export class SharedModule {}
