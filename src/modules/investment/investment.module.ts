import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';


@Module({
  imports:[SharedModule],
  controllers: [InvestmentController],
  providers: [InvestmentService],
  exports:[]
})
export class InvestmentModule {}