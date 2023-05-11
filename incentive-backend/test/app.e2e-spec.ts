import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('should return an array of users', async () => {
      const res = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user with the specified id', async () => {
      const res = await request(app.getHttpServer())
        .get('/users/1')
        .expect(200);

      expect(res.body.id).toEqual(1);
    });

    it('should return a 404 error if user is not found', async () => {
      const res = await request(app.getHttpServer())
        .get('/users/99')
        .expect(404);

      expect(res.body.message).toEqual('User not found');
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const user = {
        email: 'test@example.com',
        password: 'password',
        personalnummer: '12345678'
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(user)
        .expect(201);

      expect(res.body).toMatchObject(user);
    });
  });

  describe('PUT /users/:id', () => {
    it('should update an existing user', async () => {
      const updatedUser = {
        email: 'new-email@example.com',
        password: 'new-password',
        personalnummer: '12345678'
      };

      const res = await request(app.getHttpServer())
        .put('/users/1')
        .send(updatedUser)
        .expect(200);

      expect(res.body.email).toEqual(updatedUser.email);
      expect(res.body.password).toEqual(updatedUser.password);
      expect(res.body.personalnummer).toEqual(updatedUser.personalnummer);
    });

    it('should return a 404 error if user is not found', async () => {
      const res = await request(app.getHttpServer())
        .put('/users/99')
        .send({})
        .expect(404);

      expect(res.body.message).toEqual('User not found');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete an existing user', async () => {
      await request(app.getHttpServer())
        .delete('/users/1')
        .expect(200);

      const res = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(res.body).toHaveLength(0);
    });

    it('should return a 404 error if user is not found', async () => {
      const res = await request(app.getHttpServer())
        .delete('/users/99')
        .expect(404);

      expect(res.body.message).toEqual('User not found');
    });
  });
});