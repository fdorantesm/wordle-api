import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { EmailService } from './services/email.service';
import { FileService } from './services/file.service';
import { S3Service } from './services/s3.service';
import { ShortIdService } from './services/short-id.service';
import { SlugService } from './services/slug.service';
import { emailConfigLoader } from './../../core/infrastructure/config/loaders/email.loader';
import { TemplateService } from './services/template.service';
import { Titlelizer } from './services/titlelizer.service';
import { UrlService } from './services/url.service';
import { DateService } from './services/date.service';

@Module({
  imports: [ConfigModule.forFeature(emailConfigLoader)],
  providers: [
    S3Service,
    SlugService,
    ShortIdService,
    FileService,
    EmailService,
    TemplateService,
    Titlelizer,
    UrlService,
    DateService,
  ],
  exports: [
    S3Service,
    SlugService,
    ShortIdService,
    FileService,
    EmailService,
    TemplateService,
    Titlelizer,
    UrlService,
    DateService,
  ],
})
export class SharedModule {}
