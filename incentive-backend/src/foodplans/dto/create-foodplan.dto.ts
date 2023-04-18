import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';

export class CreateFoodplanDto {
    @ApiProperty({ required: true })
    name: string;
    @ApiProperty({ required: false })
    montagProdukt: string;
    @ApiProperty({ required: false })
    montagPreis: number;
    @ApiProperty({ required: false })
    dienstagProdukt: string;
    @ApiProperty({ required: false })
    dienstagPreis: number;
    @ApiProperty({ required: false })
    mittwochProdukt: string;
    @ApiProperty({ required: false })
    mittwochPreis: number;
    @ApiProperty({ required: false })
    donnerstagProdukt: string;
    @ApiProperty({ required: false })
    donnerstagPreis: number;
    @ApiProperty({ required: false })
    freitagProdukt: string;
    @ApiProperty({ required: false })
    freitagPreis: number;
    @ApiProperty({ required: false })
    samstagProdukt: string;
    @ApiProperty({ required: false })
    samstagPreis: number;
    @ApiProperty({ required: true})
    start: DateTime;
}