import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { HealthModule } from 'src/modules/health/health.module';
import { HttpExceptionFilter } from 'src/core/infrastructure/filters/exception.filter';
import { TransformInterceptor } from 'src/core/infrastructure/interceptors/transform.interceptor';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
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
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /health', async () => {
    await request(app.getHttpServer())
      .get('/health')
      .expect(HttpStatus.NO_CONTENT);
  });
});
