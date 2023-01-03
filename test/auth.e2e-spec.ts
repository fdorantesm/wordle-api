import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { CoreModule } from 'src/core/core.module';
import { MongooseMemoryFactory } from 'src/database/factories/mongoose-memory.factory';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;

  const rootUser = {
    email: 'root@email.local',
    password: 'sesame',
    scopes: [Scope.ROOT],
    nick: 'root',
    name: 'Root',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        AuthModule,
        UsersModule,
        MongooseModule.forRootAsync({
          useClass: MongooseMemoryFactory,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = app.get(UsersService);
  });

  it('GET /auth/login', async () => {
    await usersService.register(
      rootUser.email,
      rootUser.password,
      rootUser.scopes,
    );

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: rootUser.email,
        password: rootUser.password,
      })
      .expect(HttpStatus.CREATED);
  });

  it('GET /auth/me', async () => {
    await usersService.register(
      rootUser.email,
      rootUser.password,
      rootUser.scopes,
    );

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: rootUser.email,
      password: rootUser.password,
    });

    const me = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `bearer ${login.body.data.accessToken}`);

    expect(me.statusCode).toBe(HttpStatus.OK);
  });

  it('GET /auth/register', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: rootUser.email,
        password: rootUser.password,
        name: rootUser.name,
        nick: rootUser.nick,
      })
      .expect(HttpStatus.CREATED);
  });
});
