import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'
import { request } from 'http';
import { AuthGuard } from 'src/auth.gaurd';
import { CompanyCollection } from 'src/common/collections/allCollections';
import { validEmail } from 'src/common/common.service';
import { DBHelper } from 'src/common/helpers/db.helpers';
import { FastifyRequest } from "fastify";
import { REQUEST } from '@nestjs/core';
const RazorPay = require('razorpay')
@Injectable()
export class InvestmentService {

    constructor(
        private readonly dbHelper: DBHelper,
        @Inject(REQUEST) private readonly request: FastifyRequest,
    ){}

    async investInCompany(){

    }

    async payWithRazorPay(data){
        let instance = new RazorPay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
          });
          try{
            const x = await instance.orders.create({
                "amount": 50000,
                "currency": "INR",
                "receipt": "123456",
                "payment_capture":1
              })
              return{
                status:'success',
                orderId: x.id
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
