import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { SesModule } from '@pluzchat/nestjs-ses';
import { S3Module } from 'nestjs-s3';

import { configOptions } from '../config';
import { databaseConfigLoader } from './application/config/loaders/database.config.loader';
import { emailConfigLoader } from './infrastructure/config/loaders/email.loader';
import { storageConfigLoader } from './infrastructure/config/loaders/storage.loader';
import { MongooseFactory } from './infrastructure/factories/mongoose.factory';
import { S3Factory } from './infrastructure/factories/s3.factory';
import { SesFactory } from './infrastructure/factories/ses.factory';
import { HttpExceptionFilter } from './infrastructure/filters/exception.filter';
import { TransformInterceptor } from './infrastructure/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    S3Module.forRootAsync({
      imports: [ConfigModule.forFeature(storageConfigLoader)],
      inject: [ConfigService],
      useClass: S3Factory,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfigLoader)],
      inject: [ConfigService],
      useClass: MongooseFactory,
    }),
    SesModule.forRootAsync({
      imports: [ConfigModule.forFeature(emailConfigLoader)],
      inject: [ConfigService],
      useClass: SesFactory,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class CoreModule {}
