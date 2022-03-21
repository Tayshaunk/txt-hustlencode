import { IsNumber, IsString } from 'class-validator';


// payload for updating the user's profile about module
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

// payload for updating the user's profile interests module
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

// payload for updating the user's general information
export class UpdateHustlencodeProfileGeneral {
  @IsString()
  public username: string;

  @IsString()
  public email: string;
}

// payload for updating the user's profile interests module
export class UpdateHustlencodeProfileLayoutDto {
  @IsString()
  public html: string;

  @IsString()
  public css: string;

  @IsString()
  public js: string;

  @IsNumber()
  public linesOfCode: number;
}
