import { IsEmail, IsString, MinLength } from 'class-validator';

const INVALID_EMAIL = { message: 'Invalid email.' };

// Payload for updating user's username and email
export class UpdateHustlencodeProfileUsernameDto {
  @IsEmail({}, INVALID_EMAIL)
  public email: string;

  @IsString()
  @MinLength(4, {
    message: 'Username must be at least 4 characters long.',
  })
  public username: string;
}

// Payload for updating user's password
export class UpdateHustlencodeProfilePasswordDto {
  @IsString()
  public currentPassword: string;
  @IsString()
  @MinLength(4, {
    message: 'Username must be at least 4 characters long.',
  })
  public password: string;
}


// Payload for updating user's name
export class UpdateHustlencodeProfileGeneralDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;
}
