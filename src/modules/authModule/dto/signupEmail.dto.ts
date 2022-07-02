import { ApiProperty } from "@nestjs/swagger";
import {IsString, IsBoolean, IsEmail, IsOptional} from 'class-validator';

export class SignupEmailDto {
    @ApiProperty({
        description: 'email',
        default: "",
        required:true
    })
    @IsString()
    email: string;

    @ApiProperty({
        description: 'name',
        default: "",
        required:false
    })
    @IsString()
    @IsOptional()
    name : string;

    @ApiProperty({
        description: 'password',
        default: "",
        required:true
    })
    @IsString()
    password : string;

}