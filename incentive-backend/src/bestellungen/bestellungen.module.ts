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
        montag: "test; Menü 2",
        dienstag: "test",
        mittwoch: "test",
        donnerstag: "Menü 2",
        freitag: "test",
        samstag: "test",
      });
    }
  }