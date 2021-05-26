import * as express from 'express';
import IApplicationResorces from './IApplicationResorces.interface';


interface IRouter{

    setupRoutes(application: express.Application, resourses: IApplicationResorces);
}

export default IRouter;