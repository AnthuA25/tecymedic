import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateDoctorDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(25)
    @IsNotEmpty()
    speciality: string;

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    @IsNotEmpty()
    license: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

}
