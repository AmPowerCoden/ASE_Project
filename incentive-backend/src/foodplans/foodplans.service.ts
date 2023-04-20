import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { foodplans, FoodplansDocument } from './foodplans.schema';
import mongoose, { Model } from 'mongoose';
import { CreateFoodplanDto } from './dto/create-foodplan.dto';
import { DateTime } from 'luxon';
import { Logger } from '@nestjs/common';


  @Injectable()
  export class foodplansService{
    constructor(@InjectModel(foodplans.name) private foodplansModel: Model<FoodplansDocument>) {
     
    }

    async findOne(name: string): Promise<FoodplansDocument | undefined> {
      return this.foodplansModel.findOne({ name });
    }

    async hasfoodplan(name: string) {
      return !!(await this.findOne(name));
    }

    async findFoodplans() {
      return this.foodplansModel.find({});
    }

    async findFoodplansDate(start: string) {
      let foodplans = this.foodplansModel.find({start: start});
      return foodplans
    }

    async createFoodplans(foodplanToCreate: CreateFoodplanDto) {
      const userDocument = new this.foodplansModel(foodplanToCreate);
      await userDocument.save();
      return userDocument;
    }

    async updateFoodplan(name: string, update: Partial<foodplans>) {
      const user = await this.findOne(name);
      Object.assign(user, update);
      await user.save();
      return user;
    }

    async deleteFoodplan(name: string) {
      await this.foodplansModel.deleteOne({ name: name });
    }

    async ensureFoodplan(foodplanToCreate: CreateFoodplanDto) {
      if (await this.hasfoodplan(foodplanToCreate.name)) {
        return;
      }
      await this.createFoodplans(foodplanToCreate);
    }
  

  }