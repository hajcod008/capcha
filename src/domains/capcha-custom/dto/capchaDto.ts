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

  
  @IsNotEmpty()
  @IsString()
  token:any
}

export class capchaResponseDto{ 
    success: boolean;

  result;

  message: string;
}
