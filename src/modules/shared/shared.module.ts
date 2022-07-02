
import { Global, Module } from "@nestjs/common";
import { AuthGuard } from "src/auth.gaurd";
import { DBHelper } from "src/common/helpers/db.helpers";

import { ConstantsService } from "./constant.service";

@Global()
@Module({
    providers: [ConstantsService, DBHelper,AuthGuard],
    exports: [ConstantsService, DBHelper,AuthGuard],
    imports: [],
    controllers: [],
})

export class SharedModule { }