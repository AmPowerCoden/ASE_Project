import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  password: string;
  @ApiProperty({ required: true })
  personalnummer: number;

  @ApiProperty({ required: false })
  firstname?: string;
  @ApiProperty({ required: false })
  lastname?: string;
  @ApiProperty({ required: false })
  roles?: string[];
  @ApiProperty({ required: false })
  assignedUsers?: string[];
}
