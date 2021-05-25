import * as express from "express";
import BazenService from './service';
import BazenController from './controller';
import IApplicationResorces from '../../common/IApplicationResorces.interface';

class BazenRouter{

    public static setupRouts( application: express.Application, resources: IApplicationResorces){

        const bazenService: BazenService = new BazenService(resources.db);
        const bazenController: BazenController = new BazenController(bazenService);

        application.get("/bazen", bazenController.getAll.bind(bazenController));
        application.get("/bazen/:id", bazenController.getById.bind(bazenController));

    }

}

export default BazenRouter;