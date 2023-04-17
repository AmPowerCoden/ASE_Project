import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class FoodplansDto{
    @ApiProperty()
    name: string; //name soll immer so aufgebaut sein: menue1_12_07_2022 das datum soll hierbei der Beginn sein
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
}