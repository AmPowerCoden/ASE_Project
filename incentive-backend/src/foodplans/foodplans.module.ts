import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodplansSchema, foodplans } from './foodplans.schema';
import { foodplansController } from './foodplans.controller';
import { foodplansService } from './foodplans.service';
import { DateTime } from 'luxon';

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
        montagProdukt: "test",
        montagPreis: 22.09,
        dienstagProdukt: "test",
        dienstagPreis: 22.09,
        mittwochProdukt: "test",
        mittwochPreis: 22.09,
        donnerstagProdukt: "test",
        donnerstagPreis: 22.09,
        freitagProdukt: "test",
        freitagPreis: 22.09,
        samstagProdukt: "test",
        samstagPreis: 22.09,
        start: "2023-04-17"
      });
    }
  }