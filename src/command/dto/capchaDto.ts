import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  MaxLength,
  IsMobilePhone,
  IsEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CapchaDto {
  @IsNotEmpty()
  @IsString()
  hashCap: string;


  @IsNotEmpty()
  @IsString()
  captchaText:string;
}

export class capchaResponseDto{ 
    success: boolean;

  result;

  message: string;
}
