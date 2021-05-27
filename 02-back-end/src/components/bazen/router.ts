import * as express from "express";
import BazenService from './service';
import BazenController from './controller';
import IApplicationResorces from '../../common/IApplicationResorces.interface';
import IRouter from '../../common/IRouter.interface';

class BazenRouter implements IRouter{

    public setupRoutes( application: express.Application, resources: IApplicationResorces){

        const bazenService: BazenService = new BazenService(resources.db);
        const bazenController: BazenController = new BazenController(bazenService);

        application.get("/bazen", bazenController.getAll.bind(bazenController));
        application.get("/bazen/:id", bazenController.getById.bind(bazenController));
        application.post("/bazen", bazenController.add.bind(bazenController));
        application.put("/bazen/:id", bazenController.edit.bind(bazenController));
    }

}

export default BazenRouter;