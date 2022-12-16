import { IsString, Length } from 'class-validator';

export class MakeAttemptDto {
  @IsString()
  @Length(5)
  public readonly word: string;
}
