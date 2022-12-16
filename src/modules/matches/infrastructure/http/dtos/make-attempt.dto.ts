import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class MakeAttemptDto {
  @ApiProperty({ example: 'queso' })
  @IsString()
  @Length(5)
  public readonly word: string;
}
