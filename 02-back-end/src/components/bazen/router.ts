import * as express from "express";
import BazenService from './service';
import BazenController from './controller';
import IApplicationResorces from '../../common/IApplicationResorces.interface';
import IRouter from '../../common/IRouter.interface';
import AuthMiddleware from "../../middleware/auth.middleware";

class BazenRouter implements IRouter{

    public setupRoutes( application: express.Application, resources: IApplicationResorces){

        const bazenController: BazenController = new BazenController(resources);

        application.get("/bazen", AuthMiddleware.getVerifier("administrator", "korisnik"), bazenController.getAll.bind(bazenController));
        application.get("/bazen/:id", AuthMiddleware.getVerifier("administrator", "korisnik"), bazenController.getById.bind(bazenController));
        application.post("/bazen", AuthMiddleware.getVerifier("administrator"), bazenController.add.bind(bazenController));
        application.put("/bazen/:id", AuthMiddleware.getVerifier("administrator"), bazenController.edit.bind(bazenController));
        application.delete("/bazen/:id", AuthMiddleware.getVerifier("administrator"), bazenController.deleteById.bind(bazenController));
    }

}

export default BazenRouter;