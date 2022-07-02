import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';

import { FastifyReply } from 'fastify';
import { InvestmentService } from './investment.service';


@Controller()
export class InvestmentController {


    constructor(private readonly investmentService: InvestmentService) { }

    @Post('')
    async getDetails(@Body() body, @Res() res: FastifyReply) {

        let response = {};

        if (response['status'] == 'success') {
            return res.status(200).send(response);
        } else {
            return res.status(400).send(response);
        }
    }

    @Post('pay')
    async pay(@Body() body, @Res() res) {

        let response = await this.investmentService.payWithRazorPay(body);
        if (response['status'] == 'success') {
            return res.status(200).send(response);
        } else {
            return res.status(400).send(response);
        }
    }

}
