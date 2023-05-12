/*import { bestellungenController } from './bestellungen.controller';
import { bestellungenService } from './bestellungen.service';


describe('CatsController', () => {
  let bestellungenController: bestellungenController;
  let bestellungenService: bestellungenService;

  beforeEach(() => {
    bestellungenService = new bestellungenService();
    bestellungenController = new bestellungenController(bestellungenService);
  });

  describe('findBestellung', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(bestellungenService, 'findBestellung').mockImplementation(() => result);

      expect(await bestellungenController.getBestellungen()).toBe(result);
    });
  });
});*/



import { Test, TestingModule } from '@nestjs/testing';
import { bestellungenService } from './bestellungen.service';
import { bestellungen } from './bestellungen.schema';
import mongoose from 'mongoose';

describe('UsersService', () => {
  let service: bestellungenService;

  mongoose.set('strictQuery', true);

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [bestellungenService],
    }).compile();

    service = moduleRef.get<bestellungenService>(bestellungenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it.each`
    name      | returnVal
    ${1} | ${{ montag: "",dienstag: "",mittwoch: "",donnerstag: "",freitag: "",samstag: "",montagGesamtpreis: 0,dienstagGesamtpreis: 0,mittwochGesamtpreis: 0,donnerstagGesamtpreis: 0,freitagGesamtpreis: 0,samstagGesamtpreis: 0,date: "2023-05-08" }}
  `(
    'should call findOne for $name and return $returnVal',
    async ({ personalnummer, returnVal }: { personalnummer: number; returnVal: bestellungen }) => {
      expect(await service.findOne(personalnummer)).toEqual(returnVal);
    },
  );
});
