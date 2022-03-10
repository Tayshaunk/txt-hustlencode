import { IsEmail, IsNumber, IsString } from 'class-validator';

const INVALID_EMAIL = { message: 'Invalid email.' };

// Paylod for hustlencode login
export class UpdateHustlencodeProfileAboutDto {
  @IsString()
  public html: string;

  @IsString()
  public css: string;

  @IsString()
  public js: string;

  @IsNumber()
  public linesOfCode: number;
}

export class UpdateHustlencodeProfileInterestsDto {
  @IsString()
  public html: string;

  @IsString()
  public css: string;

  @IsString()
  public js: string;

  @IsNumber()
  public linesOfCode: number;
}
