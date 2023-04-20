import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { DateTime } from 'luxon';

export class FoodplansDto{
    @ApiProperty()
    name: string;
    @ApiProperty()
    montagProdukt: string;
    @ApiProperty()
    montagPreis: number;
    @ApiProperty()
    dienstagProdukt: string;
    @ApiProperty()
    dienstagPreis: number;
    @ApiProperty()
    mittwochProdukt: string;
    @ApiProperty()
    mittwochPreis: number;
    @ApiProperty()
    donnerstagProdukt: string;
    @ApiProperty()
    donnerstagPreis: number;
    @ApiProperty()
    freitagProdukt: string;
    @ApiProperty()
    freitagPreis: number;
    @ApiProperty()
    samstagProdukt: string;
    @ApiProperty()
    samstagPreis: number;
    @ApiProperty()
    start: string;
}