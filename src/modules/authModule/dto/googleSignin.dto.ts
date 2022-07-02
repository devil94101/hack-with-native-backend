import { ApiProperty } from "@nestjs/swagger";
import {IsString} from 'class-validator';
export class GoogleSignInDto {
    @ApiProperty({
        description: 'access token',
        default: "",
        required:true
    })
    @IsString()
    accessToken: string;

}