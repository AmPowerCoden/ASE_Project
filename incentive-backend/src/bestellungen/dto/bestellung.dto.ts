import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class BestellungenDto{
    @ApiProperty()
    personalnummer: number;
    @ApiProperty()
    montag:string;
    @ApiProperty()
    dienstag: string;
    @ApiProperty()
    mittwoch:string;
    @ApiProperty()
    donnerstag: string;
    @ApiProperty()
    freitag:string;
    @ApiProperty()
    samstag:string;
    @ApiProperty()
    montagGesamtpreis: number;
    @ApiProperty()
    dienstagGesamtpreis: number;
    @ApiProperty()
    mittwochGesamtpreis:number;
    @ApiProperty()
    donnerstagGesamtpreis: number;
    @ApiProperty()
    freitagGesamtpreis:number;
    @ApiProperty()
    samstagGesamtpreis:number;
}