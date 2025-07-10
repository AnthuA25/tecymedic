import {
    IsNotEmpty, 
    IsString, 
    MinLength, 
    MaxLength, 
    IsEmail, 
    // IsPhoneNumber, 
    IsOptional,
    IsEnum
} from "class-validator";

enum DocumentType {
    DNI = "DNI",
    RUC = "RUC",
    CE = "CE",
}
export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    last_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(12)
    document_number: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(3)
    @IsEnum(DocumentType)
    document_type: string;

    @MinLength(3)
    @MaxLength(50)
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(15)
    // @IsPhoneNumber()
    @IsOptional()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(15)
    password: string;
}
