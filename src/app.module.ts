import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { routes } from './app.routes';
import { AppService } from './app.service';
import { AuthGuard } from './auth.gaurd';
import { AuthModule } from './modules/authModule/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { InvestmentModule } from './modules/investment/investment.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    CompanyModule,
    InvestmentModule,
    RouterModule.register(routes),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}