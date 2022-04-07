import { IsEmail, IsString } from 'class-validator';

const INVALID_EMAIL = { message: 'Invalid email.' };

// payload for updating the user's profile about module
export class HncForgotPasswordDto {
  @IsString()
  @IsEmail()
  public email: string;
}

// Paylod for hustlencode login
export class HncLoginDto {
  @IsEmail({}, INVALID_EMAIL)
  public email: string;

  @IsString()
  public password: string;
}


// payload for resetting a forgotten password
export class HncResetPasswordDto {
  @IsString()
  public password: string;

  @IsString()
  public passwordConfirm: string;

  @IsString()
  public userId: string;
  
  @IsString()
  public token: string;
}

// Payload for the hustlencode signup
export class HncSignupDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail({}, INVALID_EMAIL)
  public email: string;

  @IsString()
  public username: string;

  @IsString()
  public gender: string;

  @IsString()
  public organization: string;

  @IsString()
  public birthday: Date;

  @IsString()
  public password: string;

  @IsString()
  public verifyPassword: string;
}