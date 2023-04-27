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
        name: "Menü 1;2023-04-24",
        montagProdukt: "Gulasch",
        montagPreis: 4.55,
        dienstagProdukt: "Geschnetzeltes",
        dienstagPreis: 4.35,
        mittwochProdukt: "Burger",
        mittwochPreis: 4.40,
        donnerstagProdukt: "Sphagetti",
        donnerstagPreis: 4.45,
        freitagProdukt: "Brezen",
        freitagPreis: 4.50,
        samstagProdukt: "Chiilie",
        samstagPreis: 4.55,
        start: "2023-04-24"
      });
    }
  }