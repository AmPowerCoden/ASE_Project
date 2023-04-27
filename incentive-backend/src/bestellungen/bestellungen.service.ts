import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { bestellungen, BestellungsDocument } from './bestellungen.schema';
import mongoose, { Model } from 'mongoose';
import { CreateBestellungDto } from './dto/create-bestellung.dto';

  @Injectable()
  export class bestellungenService{
    constructor(@InjectModel(bestellungen.name) private bestellungenModel: Model<BestellungsDocument>) {
     
    }

    async findOne(personalnummer: number): Promise<BestellungsDocument | undefined> {
      return this.bestellungenModel.findOne({ personalnummer });
    }

    async hasbestellung(personalnummer: number) {
      return !!(await this.findOne(personalnummer));
    }

    async findBestellung() {
      return this.bestellungenModel.find({});
    }

    async createBestellung(bestellungToCreate: CreateBestellungDto) {
      const userDocument = new this.bestellungenModel(bestellungToCreate);
      await userDocument.save();
      return userDocument;
    }

    async updateBestellung(personalnummer: number, update: Partial<bestellungen>) {
      const bestellung = await this.findOne(personalnummer);
      Object.assign(bestellung, update);
      await bestellung.save();
      return bestellung;
    }

    async deleteBestellung(personalnummer: number) {
      await this.bestellungenModel.deleteOne({ personalnummer: personalnummer });
    }

    async ensureBestellung(bestellungToCreate: CreateBestellungDto) {
      if (await this.hasbestellung(bestellungToCreate.personalnummer)) {
        return;
      }
      await this.createBestellung(bestellungToCreate);
    }

    async deleteAllBestellungen() {
      await this.bestellungenModel.remove({})
    }
  

  }