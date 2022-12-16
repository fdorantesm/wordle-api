import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterProfile {
  @ApiProperty({ example: 'Juan Hernández' })
  @IsString()
  public name: string;

  @ApiProperty({ example: '+525555555555' })
  @IsString()
  public phone: string;
}
