import IRouter from "../../common/IRouter.interface";
import * as express from 'express';
import IApplicationResorces from "../../common/IApplicationResorces.interface";
import StranicaController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

class StranicaRouter implements IRouter{

    public setupRoutes( application: express.Application, resources: IApplicationResorces){

        const stranicaController: StranicaController = new StranicaController(resources);

        application.get("/stranica", AuthMiddleware.getVerifier("administrator"),stranicaController.getAll.bind(stranicaController));
        application.get("/stranica/:id", AuthMiddleware.getVerifier("administrator"),stranicaController.getById.bind(stranicaController));
        application.post("/stranica", AuthMiddleware.getVerifier("administrator"),stranicaController.add.bind(stranicaController));
        application.put("/stranica/:id", AuthMiddleware.getVerifier("administrator"),stranicaController.edit.bind(stranicaController));
        application.delete("/stranica/:sid", AuthMiddleware.getVerifier("administrator"),stranicaController.delete.bind(stranicaController));
    }

}

export default StranicaRouter;