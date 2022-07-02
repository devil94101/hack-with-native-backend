import { AuthModule } from "./modules/authModule/auth.module";
import { CompanyModule } from "./modules/company/company.module";
import { InvestmentModule } from "./modules/investment/investment.module";

export const routes = [
    {
        path: '/user',
        children: [
            {
                path: '/auth',
                module: AuthModule
            }, {
                path: '/investment',
                module: InvestmentModule
            }

        ],
    }, {
        path: '/company',
        children: [
            {
                path: '/',
                module: CompanyModule
            }
        ]
    }
];