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
