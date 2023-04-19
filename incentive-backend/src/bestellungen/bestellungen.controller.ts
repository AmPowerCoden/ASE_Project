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
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from "@nestjs/swagger";
import { bestellungenService } from "./bestellungen.service";
import { BestellungenDto } from "./dto/bestellung.dto";
import { CreateBestellungDto } from "./dto/create-bestellung.dto";
import { BestellungsDocument, bestellungen } from "./bestellungen.schema";
import { patchBestellungDto } from './dto/patch-bestellung.dto';


@Controller('bestellungen')
@ApiBearerAuth()
export class bestellungenController{
  constructor(private readonly bestellungenService: bestellungenService){}

    @Get('')
    @ApiResponse({ type: () => BestellungenDto, isArray: true })
    async getBestellungen(){
        const foodplans = await this.bestellungenService.findBestellung()
        return foodplans
    }

    @Get(':personalnummer')
    @ApiResponse({ type: () => BestellungenDto })
    async getBestellungByName(@Request() request, @Param('personalnummer') personalnummer: number){
      const foodplan = await this.bestellungenService.findOne(personalnummer);
      return this.foodplanToRest(foodplan);
    }

  @Post('')
  @ApiResponse({ type: () => BestellungenDto })
  @ApiBody({ type: () => CreateBestellungDto })
  async createBestellung(@Body() bestellungToCreate: CreateBestellungDto) {
    if (await this.bestellungenService.hasbestellung(bestellungToCreate.personalnummer)) {
      throw new ConflictException(
        { email: bestellungToCreate.personalnummer, error: 'Foodplan already exists' },
        'Foodplan already exists',
      );
    }
    const foodplan = await this.bestellungenService.createBestellung(bestellungToCreate);
    return this.foodplanToRest(foodplan);
  }

  @Delete(':personalnummer')
  @ApiParam({ name : 'personalnummer' })
  async deleteUser(@Param('personalnummer') personalnummer: number) {
    await this.bestellungenService.deleteBestellung(personalnummer);
  }

  @Patch(':personalnummer')
  @ApiBody({ type: () => patchBestellungDto })
  @ApiParam({ name: 'personalnummer' })
  async patchUser(@Param('personalnummer') personalnummer: number, @Body() update: bestellungen) {
    const user = await this.bestellungenService.updateBestellung(personalnummer, update);
  }


  private foodplanToRest(bestellung: BestellungsDocument) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { personalnummer, ...result } = bestellung.toJSON();
    return result;
  }
}