import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateApiKeyDto {
  @ApiProperty({ example: 'apps' })
  @IsString()
  public readonly name: string;
}
