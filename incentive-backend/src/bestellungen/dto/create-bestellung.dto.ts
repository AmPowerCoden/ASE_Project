import { ApiProperty } from '@nestjs/swagger';

export class CreateBestellungDto {
    @ApiProperty({ required: true })
    personalnummer: number;
    @ApiProperty({ required: false })
    montag: string;
    @ApiProperty({ required: false })
    dienstag: string;
    @ApiProperty({ required: false })
    mittwoch: string;
    @ApiProperty({ required: false })
    donnerstag: string;
    @ApiProperty({ required: false })
    freitag: string;
    @ApiProperty({ required: false })
    samstag: string;
}