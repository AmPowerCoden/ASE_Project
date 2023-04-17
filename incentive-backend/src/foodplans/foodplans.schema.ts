import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { FoodplansDto } from './dto/foodplans.dto';

export type FoodplansDocument = foodplans & Document;

@Schema()
export class foodplans extends FoodplansDto {
    @Prop({ required: true, unique: true })
    name: string;
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
    
    toJSON: () => foodplans;
}

export const FoodplansSchema = SchemaFactory.createForClass(foodplans);

