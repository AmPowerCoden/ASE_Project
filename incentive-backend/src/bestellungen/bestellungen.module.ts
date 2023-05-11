import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BestellungenSchema, bestellungen } from './bestellungen.schema';
import { bestellungenController } from './bestellungen.controller';
import { bestellungenService } from './bestellungen.service';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: bestellungen.name, schema: BestellungenSchema }]),
    ],
    controllers: [bestellungenController],
    providers: [bestellungenService],
    exports: [bestellungenService],
  })
  export class BestellungenModule implements OnModuleInit {
    constructor(private readonly bestellungenService: bestellungenService) {}
  
    async onModuleInit() {
      await this.bestellungenService.ensureBestellung({
        personalnummer: 1,
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
      });
    }
  }