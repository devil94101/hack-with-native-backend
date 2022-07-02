import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';

import { FastifyReply } from 'fastify';

import { CompanyService } from './company.service';


@Controller()
export class CompanyController {


  constructor(private readonly companyService: CompanyService) { }

  @Get('get')
  async getDetails(@Query() query,@Res() res: FastifyReply){
   
    let id = query.id;
    let response = await this.companyService.getCompanyDetails(id);

    if (response['status'] == 'success') {
      return res.status(200).send(response);
    } else {
      return res.status(400).send(response);
    }
  }

  @Get('all')
  async getAllDetails(@Res() res: FastifyReply){
    let response = await this.companyService.getAllCompanyDetails();

    if (response['status'] == 'success') {
      return res.status(200).send(response);
    } else {
      return res.status(400).send(response);
    }
  }

  @Post('add')
  async addDetails(@Body() body,@Res() res: FastifyReply){

    let response = await this.companyService.addCompany(body);

    if (response['status'] == 'success') {
      return res.status(200).send(response);
    } else {
      return res.status(400).send(response);
    }
  }


}
