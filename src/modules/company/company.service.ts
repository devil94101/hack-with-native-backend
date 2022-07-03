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
            if(data.status === 'error'){
                return data;
            }
            data.forEach(ele => {
                if(ele.goalAmt && ele.raisedYet && ele.goalAmt != 0){
                    
                    let x = (+ele.raisedYet)/(+ele.goalAmt);
                  
                    let per = x * 100;
                    ele.perGained = per.toFixed(2)
                }
                else{
                    ele.perGained = 0;
                }
                let startDate= new Date(+ele.startDate)
                let endDate= new Date(+ele.endDate);
                let curDate = new Date();
                if(startDate < curDate){
                    ele.status = 'launched'
                    ele.launched = 1;
                }
                if(endDate < curDate){
                    ele.status = 'end';
                    ele.launched = -1;
                }
                if(startDate> curDate){
                    ele.status = 'coming soon';
                    const diffInMs   = +startDate - +curDate;
                    const diffInDays = parseInt((diffInMs / (1000 * 60 * 60 * 24)).toString());
                    ele.launchDays = diffInDays ? diffInDays + "days" : "less than a day"
                    
                }
            });


            return {
                status:'success',
                data,
                total:data.length
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
