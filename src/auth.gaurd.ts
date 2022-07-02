import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { trimCharsStart } from 'lodash/fp'
  import { ConstantsService } from './modules/shared/constant.service';
  import { getAuth } from 'firebase-admin/auth'
  
  @Injectable()
  export class AuthGuard implements CanActivate {
  
    constructor(
      private reflector: Reflector,
      private readonly constant: ConstantsService,
    ) {
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
  
      const request = context.switchToHttp().getRequest();
  
      return true;
      if (this.constant.skipAuth().includes(trimCharsStart('/', request.routerPath))) {
        // profiler.end();
        return true;
      }
  
      if (!request.headers || !request.headers.token) {
        throw new UnauthorizedException({
          status: 'error',
          error: 'No token found',
        });
      }
  
      const token = request.headers.token;
  
      let userDetails = await this.verifyGoogleToken(token);
      if(userDetails['status'] === 'error'){
        throw new UnauthorizedException({
          status: 'error',
          error: userDetails['message'],
        });
      }
      request.headers.uid = userDetails['uid'];
      return true;
    }
  
    async verifyGoogleToken(token: string) {
      try {
        let x = await getAuth()
          .verifyIdToken(token);
        return x;
  
      }
      catch (error) {
        return {
          status: 'error',
          message: error.message
        }
      }
  
    }
  }
  