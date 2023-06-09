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
import { UsersService } from './users.service';
import { Role } from './role.enum';
import { Roles } from '../auth/roles.decorator';
import { User, UserDocument } from './user.schema';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserDto } from './dto/user.dto';
import { request } from 'http';
import { NotFoundException } from '@nestjs/common';

@Controller('users')
//@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':userId')
  @ApiResponse({ type: () => UserDto })
  @ApiParam({ name: 'userId' })
  async getUser(@Request() request, @Param('userId') userId: string) {
    const user = await this.userService.findOneById(userId);
    return this.userToRest(user);
  }

  @Get(':email')
  @ApiResponse({ type: () => UserDto })
  async getUserWithMail(@Request() request, @Param('email') email: string) {
    const user = await this.userService.findOne(email);
    return this.userToRest(user);
  }

  @Get('/personalnummer/:personalnummer')
  @ApiResponse({ type: () => UserDto })
  async getUserByPersonalnummer(@Request() request, @Param('personalnummer') personalnummer: number){
    const user = await this.userService.findOneByPersonalnummer(personalnummer);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return this.userToRest(user);
  }

  @Roles(Role.Administrator)
  @Get('')
  @ApiResponse({ type: () => UserDto, isArray: true })
  async getUsers() {
    const users = await this.userService.findUsers();
    return users.map((user) => this.userToRest(user));
  }

  @Post('')
  @ApiResponse({ type: () => UserDto })
  @ApiBody({ type: () => CreateUserDto })
  async createUser(@Body() userToCreate: CreateUserDto) {
    if (await this.userService.hasUser(userToCreate.email)) {
      throw new ConflictException(
        { email: userToCreate.email, error: 'User already exists' },
        'User already exists',
      );
    }
    const user = await this.userService.createUser(userToCreate);
    return this.userToRest(user);
  }

  @Roles(Role.Administrator)
  @Delete(':userId')
  @ApiParam({ name: 'userId' })
  async deleteUser(@Param('userId') userId: string) {
    await this.userService.deleteUser(userId);
  }

  @Roles(Role.Administrator)
  @Patch(':userId')
  @ApiBody({ type: () => PatchUserDto })
  @ApiParam({ name: 'userId' })
  async patchUser(@Param('userId') userId: string, @Body() update: User) {
    const user = await this.userService.updateUser(userId, update);
    return this.userToRest(user);
  }

  private userToRest(user: UserDocument) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user.toJSON();
    return result;
  }
}
