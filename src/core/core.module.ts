import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { configOptions } from '../config';
import { databaseConfigLoader } from './application/config/loaders/database.config.loader';
import { MongooseFactory } from './infrastructure/factories/mongoose.factory';
import { HttpExceptionFilter } from './infrastructure/filters/exception.filter';
import { TransformInterceptor } from './infrastructure/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfigLoader)],
      inject: [ConfigService],
      useClass: MongooseFactory,
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
