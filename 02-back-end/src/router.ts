import * as express from 'express';
import IApplicationResorces from './common/IApplicationResorces.interface';
import IRouter from './common/IRouter.interface';


class Router{

    static setupRouter( application: express.Application, resources: IApplicationResorces, routers: IRouter[]){
        for(const router of routers){
            router.setupRoutes(application, resources);
        }
    }

}

export default Router;