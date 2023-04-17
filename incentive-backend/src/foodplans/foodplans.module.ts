import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodplansSchema, foodplans } from './foodplans.schema';
import { foodplansController } from './foodplans.controller';
import { foodplansService } from './foodplans.service';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: foodplans.name, schema: FoodplansSchema }]),
    ],
    controllers: [foodplansController],
    providers: [foodplansService],
    exports: [foodplansService],
  })
  export class FoodplanModule implements OnModuleInit {
    constructor(private readonly foodService: foodplansService) {}
  
    async onModuleInit() {
      await this.foodService.ensureFoodplan({
        name: "test",
        montag: "test",
        dienstag: "test",
        mittwoch: "test",
        donnerstag: "test",
        freitag: "test",
        samstag: "test",
      });
    }
  }