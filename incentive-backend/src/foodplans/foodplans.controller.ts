import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    NotFoundException,
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
import { request } from 'https';
import { start } from 'repl';
import { get } from 'http';

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
      if (!foodplan) {
        throw new NotFoundException(`User not found`);
      }
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

  @Get('/date/:date')
  @ApiResponse({ type: () => FoodplansDto, isArray: true })
  async getFoodplanByDate(@Request() request, @Param('date') startDate: string) {
    const foodplans = this.foodplansService.findFoodplansDate(startDate);

    if (!foodplans) {
      throw new NotFoundException(`User not found`);
    }

    return foodplans;
  }

  private foodplanToRest(foodplan: FoodplansDocument) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, ...result } = foodplan.toJSON();
    return result;
  }
}