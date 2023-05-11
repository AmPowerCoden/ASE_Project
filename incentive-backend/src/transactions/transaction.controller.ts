import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/role.enum';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { TransactionDto } from './dto/transaction.dto';

@Controller('transactions')
@ApiBearerAuth()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('')
  @ApiResponse({ type: () => TransactionDto, isArray: true })
  async getTransactionsForUser(
    @Request() request,
    @Query('userId') userId: string,
  ) {
    if (!userId) {
      throw new BadRequestException({ error: 'userId query missing' });
    }
    return this.transactionService.getTransactionsForUser(userId);
  }

  @Roles(Role.Kantinenarbeiter, Role.Administrator)
  @Post('')
  @ApiBody({ type: () => CreateTransactionDto })
  @ApiResponse({ type: () => TransactionDto })
  async createTransaction(
    @Request() request,
    @Body() transactionToCreate: CreateTransactionDto,
  ) {
    return this.transactionService.createTransaction(
      request.user._id,
      transactionToCreate,
    );
  }
}
