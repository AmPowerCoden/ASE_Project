import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

export  { LoggerService } from "./logger.service";

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class SharedModule {}