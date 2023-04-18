import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
import { FoodplansDto } from './dto/foodplans.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { foodplansService } from './foodplans.service';
import { FoodplansDocument } from './foodplans.schema';
import { CreateFoodplanDto } from './dto/create-foodplan.dto';
import { DateTime } from 'luxon';

@Controller('foodplans')
@ApiBearerAuth()
export class foodplansController{
  constructor(private readonly foodplansService: foodplansService){}

    @Get('')
    @ApiResponse({ type: () => FoodplansDto, isArray: true })
    async getFoodplans(){
        const foodplans = await this.foodplansService.findFoodplans()
        return foodplans
    }

    @Get(':name')
    @ApiResponse({ type: () => FoodplansDto })
    async getFoodplanByName(@Request() request, @Param('name') name: string){
      const foodplan = await this.foodplansService.findOne(name);
      return this.foodplanToRest(foodplan);
    }

  @Post('')
  @ApiResponse({ type: () => FoodplansDto })
  @ApiBody({ type: () => CreateFoodplanDto })
  async createFoodplan(@Body() foodplanToCreate: CreateFoodplanDto) {
    if (await this.foodplansService.hasfoodplan(foodplanToCreate.name)) {
      throw new ConflictException(
        { email: foodplanToCreate.name, error: 'Foodplan already exists' },
        'Foodplan already exists',
      );
    }
    const foodplan = await this.foodplansService.createFoodplans(foodplanToCreate);
    return this.foodplanToRest(foodplan);
  }

  @Delete(':name')
  @ApiParam({ name: 'name' })
  async deleteFoodplan(@Param('name') name: string) {
    await this.foodplansService.deleteFoodplan(name);
  }

  @Post('date')
  @ApiParam({ name: 'date'})
  async getFoodplanByDate(@Param('date') name: DateTime) {
    await this.foodplansService.findFoodplansDate(name)
  }

  private foodplanToRest(foodplan: FoodplansDocument) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, ...result } = foodplan.toJSON();
    return result;
  }
}