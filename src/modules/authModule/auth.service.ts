import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'
import { request } from 'http';
import { AuthGuard } from 'src/auth.gaurd';
import { UsersCollection } from 'src/common/collections/allCollections';
import { validEmail } from 'src/common/common.service';
import { DBHelper } from 'src/common/helpers/db.helpers';
import { FastifyRequest } from "fastify";
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AuthService {

    constructor(
        private readonly dbHelper: DBHelper,
        private readonly gaurdService: AuthGuard,
        @Inject(REQUEST) private readonly request: FastifyRequest,
    ){}

    async signupWithEmail(data: {
        email: string,
        password: string,
        name?: string,

    }) {

        if (!validEmail(data.email)) {
            return {
                status: "error",
                message: 'Invalid email!'
            }
        }

        if (!data.name) {
            data.name = data.email.split('@')[0];
        }

        let auth = admin.auth();
        try{
            let userDetail = await auth.createUser({
                email: data.email,
                emailVerified: false,
                password: data.password,
                displayName: data.name,
                disabled: false,
            })

            await this.dbHelper.addById(UsersCollection,userDetail.uid,{
                email: data.email,
                displayName: data.name,
                investments: []
            })

            return{
                status:'success',
                message:'user added successfully',
            }
        }
        catch(err){
            return{
                status:'error',
                message:err.message
            }
        }
       
    }

    async signInUsingToken(accessToken) {

        let tokenRes = await this.gaurdService.verifyGoogleToken(accessToken);
        if (tokenRes['status'] === 'error') {
            return tokenRes;
        }
        else {

            let user = await this.dbHelper.getDataById(UsersCollection,tokenRes['uid']);

            if(user['status'] === 'error'){
              
                await this.dbHelper.addById(UsersCollection,tokenRes['uid'],{
                    email: tokenRes['email'],
                    displayName: tokenRes['name'],
                    investments: []
                });
                return{
                    status:'success',
                    message:'user added successfully',
                }
            }
            return{
                status:'success',
                message:'user already exist',
            }
        }
    }

    async getUserDetails(){

        let uid = this.request.headers.uid;
        if(!uid){
            return {
                status:'error',
                message:'user not authenticated'
            }
        }

        try{
            let userData = await this.dbHelper.getDataById(UsersCollection,uid.toString());
            delete userData.investments;
            return {
                status:'success',
                data: userData
            }
        }
        catch(err){
            return{
                status:'error',
                message:err.message
            }
        }        

    }
   
}
