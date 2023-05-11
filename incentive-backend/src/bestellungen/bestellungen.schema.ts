import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { BestellungenDto } from './dto/bestellung.dto';

export type BestellungsDocument = bestellungen & Document;

@Schema()
export class bestellungen extends BestellungenDto {
    @Prop({ required: true, unique: true })
    personalnummer: number;
    @Prop({})
    montag: string;
    @Prop({})
    dienstag: string;
    @Prop({})
    mittwoch: string;
    @Prop({})
    donnerstag: string;
    @Prop({})
    freitag: string;
    @Prop({})
    samstag: string;
    @Prop({})
    montagGesamtpreis: number;
    @Prop({})
    dienstagGesamtpreis: number;
    @Prop({})
    mittwochGesamtpreis: number;
    @Prop({})
    donnerstagGesamtpreis: number;
    @Prop({})
    freitagGesamtpreis: number;
    @Prop({})
    samstagGesamtpreis: number;
    @Prop({required: true})
    date: string;
    
    toJSON: () => bestellungen;
}

export const BestellungenSchema = SchemaFactory.createForClass(bestellungen);