import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsMobilePhone } from 'class-validator';

export class SignupPhoneDto {
    @ApiProperty({
        description: 'phone number',
        default: "",
        required: true
    })
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'name',
        default: "",
        required: true
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'password',
        default: "",
        required: true
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'confirm password',
        default: "",
        required: true
    })
    @IsString()
    confirmPassword: string;

}