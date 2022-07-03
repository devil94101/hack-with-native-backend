import { Inject, Injectable } from '@nestjs/common';
@Injectable()
export class ConstantsService {
    private ENVIRONMENT: string = '';
    constructor(
    ) {
        this.ENVIRONMENT = process.env.ENV.toLowerCase();
    }

    skipAuth(){
        let skip = ['user/auth/signupByEmail','user/auth/googleSignIn','user/company/get','user/company/all'];
        return skip;
    }
    
    allowedTypes(){
        let types = [];
        return types;
    }

}