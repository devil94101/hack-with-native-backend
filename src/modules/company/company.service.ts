import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'
import { request } from 'http';
import { AuthGuard } from 'src/auth.gaurd';
import { CompanyCollection } from 'src/common/collections/allCollections';
import { validEmail } from 'src/common/common.service';
import { DBHelper } from 'src/common/helpers/db.helpers';
import { FastifyRequest } from "fastify";
import { REQUEST } from '@nestjs/core';

@Injectable()
export class CompanyService {

    constructor(
        private readonly dbHelper: DBHelper,
        @Inject(REQUEST) private readonly request: FastifyRequest,
    ){}


    async getCompanyDetails(id){
        try{
            let projectData = await this.dbHelper.getDataById(CompanyCollection,id);
            return {
                status:'success',
                data: projectData
            }
        }
        catch(err){
            return{
                status:'error',
                message:err.message
            }
        }        

    }

    async addCompany(body){
        try{
            let id = await this.dbHelper.addRow(CompanyCollection,body);
           
            return {
                status: 'success',
                message: 'data added successfully',
                id
            }
        }
        catch(err){
            return{
                status:'error',
                message:err.message
            }
        }        
    }
   
    async getAllCompanyDetails(){
        try{
            let data = await this.dbHelper.getData(CompanyCollection);
            return {
                status:'success',
                data
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
