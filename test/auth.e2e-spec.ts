import { JwtModule } from '@nestjs/jwt';
import * as request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtConfiguration } from '@app/common/types/jwt/jwt.configuration';

import { tokenConfigLoader } from 'src/modules/auth/application/config/loaders/token.config-loader';
import { JwtStrategy } from 'src/modules/auth/infrastructure/http/passport/jwt/jwt.strategy';
import { AuthModule } from 'src/modules/auth/auth.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        JwtModule.registerAsync({
          imports: [ConfigModule.forFeature(tokenConfigLoader)],
          inject: [ConfigService],
          useFactory(configService: ConfigService) {
            const config = configService.get<JwtConfiguration>('jwt');
            return {
              secret: config.secret,
              signOptions: {
                expiresIn: config.expires,
              },
            };
          },
        }),
      ],
      providers: [JwtStrategy],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /auth/login', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'root@email.local',
        password: 'sesame',
      })
      .expect(HttpStatus.CREATED);
  });

  it('GET /auth/me', async () => {
    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: 'root@email.local',
      password: 'sesame',
    });

    const me = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `bearer ${login.body.data.accessToken}`);

    expect(me.statusCode).toBe(HttpStatus.OK);
  });

  //   it('GET /auth/register', () => {
  //     return request(app.getHttpServer())
  //       .post('/auth/register')
  //       .send({
  //         email: 'root@email.local',
  //         password: 'sesame',
  //         name: 'Root',
  //         nick: 'root',
  //       })
  //       .expect(HttpStatus.CREATED);
  //   });
});
