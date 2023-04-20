import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { FoodplansDto } from './dto/foodplans.dto';
import {DateTime} from 'luxon'

export type FoodplansDocument = foodplans & Document;

@Schema()
export class foodplans extends FoodplansDto {
    @Prop({ required: true, unique: true })
    name: string;
    @Prop({})
    montagProdukt: string;
    @Prop({})
    montagPreis: number;
    @Prop({})
    dienstagProdukt: string;
    @Prop({})
    dienstagPreis: number;
    @Prop({})
    mittwochProdukt: string;
    @Prop({})
    mittwochPreis: number;
    @Prop({})
    donnerstagProdukt: string;
    @Prop({})
    donnerstagPreis: number;
    @Prop({})
    freitagProdukt: string;
    @Prop({})
    freitagPreis: number;
    @Prop({})
    samstagProdukt: string;
    @Prop({})
    samstagPreis: number;
    @Prop({required: true})
    start: string
    
    toJSON: () => foodplans;
}

export const FoodplansSchema = SchemaFactory.createForClass(foodplans);

