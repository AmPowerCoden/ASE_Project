import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { bestellungen } from 'src/bestellungen/bestellungen.schema';

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

  describe('GET /users/personalnummer/:personalnummer', () => {
    it('should return a user with the specified personalnummer', async () => {
      const res = await request(app.getHttpServer())
        .get('/users/personalnummer/1')
        .expect(200);

      expect(res.body.personalnummer).toEqual(1);
    });

    it('should return a 404 error if user is not found', async () => {
      const res = await request(app.getHttpServer())
        .get('/users/personalnummer/99')
        .expect(404);

      expect(res.body.message).toEqual('User not found');
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const user = {
        email: 'test@local',
        password: 'password',
        personalnummer: 12345678
      };
      const object = {
        email: 'test@local',
        personalnummer: 12345678,
        roles: [ 'user' ],
        receivedCredits: 0,
        creditsToPlace: 0,
        assignedUsers: [],
        __v: 0
      }

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(user)
        .expect(201)
      expect(res.body).toMatchObject(object);
    });
  });

    //SECTION FOODPLANS

    describe('GET /foodplans', () => {
      it('should return an array of foodplans', async () => {
        const res = await request(app.getHttpServer())
        .get('/foodplans')
        .expect(200);

        expect(res.body).toBeInstanceOf(Array);
      });
    });
  
    describe('GET /foodplans/:name', () => {
      it('should return a foodplan with the given name', async () => {
        const res = await request(app.getHttpServer())
        .get('/foodplans/Menü 1;2023-05-01')
        .expect(200); //askdhgfj
      });
  
      it('should return a 404 error if foodplan not found', async () => {
        const res = await request(app.getHttpServer())
        .get('/foodplans/99')
        .expect(404);
      });
    });
  
    describe('POST /foodplans', () => {
      it('should create a new user', async () => {
        const foodplan = {
          name: "Menü 3;2023-05-01",
          montagProdukt: "Gulasch",
          montagPreis: 4.55,
          dienstagProdukt: "Geschnetzeltes",
          dienstagPreis: 4.35,
          mittwochProdukt: "Burger",
          mittwochPreis: 4.40,
          donnerstagProdukt: "Sphagetti",
          donnerstagPreis: 4.45,
          freitagProdukt: "Brezen",
          freitagPreis: 4.50,
          samstagProdukt: "Chiilie",
          samstagPreis: 4.55,
          start: "2023-05-01"
        };

        const foodplan2 = {
          montagProdukt: "Gulasch",
          montagPreis: 4.55,
          dienstagProdukt: "Geschnetzeltes",
          dienstagPreis: 4.35,
          mittwochProdukt: "Burger",
          mittwochPreis: 4.40,
          donnerstagProdukt: "Sphagetti",
          donnerstagPreis: 4.45,
          freitagProdukt: "Brezen",
          freitagPreis: 4.50,
          samstagProdukt: "Chiilie",
          samstagPreis: 4.55,
          start: "2023-05-01"
        }
  
        const res = await request(app.getHttpServer())
          .post('/foodplans')
          .send(foodplan)
          .expect(201)
        expect(res.body).toMatchObject(foodplan2);
      });
    });
  
    describe('DELETE /foodplans/:name', () => {
      it('should delete the foodplan with the given name', async () => {
        const res = await request(app.getHttpServer())
        .get('/foodplans/Menü 1;2023-05-01')
        .expect(200);
      });
  
      it('should return a 404 error if foodplan not found', async () => {
        const res = await request(app.getHttpServer())
        .get('/foodplans/99')
        .expect(404);
      });
    });


    //GET Bestellungen
    describe('GET /bestellungen', () => {
      it('should return an array of bestellungen', async () => {
        const res = await request(app.getHttpServer())
        .get('/bestellungen')
        .expect(200);

        expect(res.body).toBeInstanceOf(Array);
      });
    });

    describe('GET /besetllungen/:personalnummer', () => {
      it('should return a bestellug with the given personalnummer', async () => {
        const res = await request(app.getHttpServer())
        .get('/bestellungen/1')
        .expect(200)
      });
  
      it('should return a 404 error if bestellung not found', async () => {
        const res = await request(app.getHttpServer())
        .get('/bestellung/439508754309')
        .expect(404);
      });
    }); 

    describe('POST /bestellung', () => {
      it('should create a new besetellung', async () => {
        const besetellung = {
          personalnummer: 2,
          montag: "",
          dienstag: "",
          mittwoch: "",
          donnerstag: "",
          freitag: "",
          samstag: "",
          montagGesamtpreis: 0,
          dienstagGesamtpreis: 0,
          mittwochGesamtpreis: 0,
          donnerstagGesamtpreis: 0,
          freitagGesamtpreis: 0,
          samstagGesamtpreis: 0,
          date: "2023-05-08"
        };

        const besetellung2 = {
          montag: "",
          dienstag: "",
          mittwoch: "",
          donnerstag: "",
          freitag: "",
          samstag: "",
          montagGesamtpreis: 0,
          dienstagGesamtpreis: 0,
          mittwochGesamtpreis: 0,
          donnerstagGesamtpreis: 0,
          freitagGesamtpreis: 0,
          samstagGesamtpreis: 0,
        };
  
        const res = await request(app.getHttpServer())
          .post('/bestellungen')
          .send(besetellung)
          .expect(201)
        expect(res.body).toMatchObject(besetellung2);
      });
    });


    describe('PATCH /bestellungen/:personalnummer', () => {
      it('should patch a besetellung', async () => {

        const besetellung = {
          montag: "a",
          dienstag: "",
          mittwoch: "",
          donnerstag: "",
          freitag: "",
          samstag: "",
          montagGesamtpreis: 0,
          dienstagGesamtpreis: 0,
          mittwochGesamtpreis: 0,
          donnerstagGesamtpreis: 0,
          freitagGesamtpreis: 0,
          samstagGesamtpreis: 0,
        };
  
        const res = await request(app.getHttpServer())
          .patch('/bestellungen/1')
          .send(besetellung)
          .expect(200)
      });
    });

});