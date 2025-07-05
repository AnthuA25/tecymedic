import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
    
    last_name: string;
    document_number: string;
    document_type: string;
    email: string;
    phone: string;
    username: string;
    password: string;
}
