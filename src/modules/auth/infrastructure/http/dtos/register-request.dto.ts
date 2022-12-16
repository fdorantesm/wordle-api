import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { RegisterProfile } from './register-profile.dto';

export class RegisterRequestDto {
  @ApiProperty({ example: 'someone@email.local' })
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'hkQjS0q((?aSc' })
  @IsString()
  @IsOptional()
  public password: string;

  @ApiProperty()
  @Type(() => RegisterProfile)
  @ValidateNested()
  public profile: RegisterProfile;
}
