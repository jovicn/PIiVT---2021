import IRouter from "../../common/IRouter.interface";
import * as express from 'express';
import IApplicationResorces from "../../common/IApplicationResorces.interface";
import AdministratorController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

class AdministratorRouter implements IRouter{

    public setupRoutes( application: express.Application, resources: IApplicationResorces){

        const administratorController: AdministratorController = new AdministratorController(resources);

        application.get("/administrator", AuthMiddleware.getVerifier("administrator"),  administratorController.getAll.bind(administratorController));
        application.get("/administrator/:id",AuthMiddleware.getVerifier("administrator"), administratorController.getById.bind(administratorController));
        application.post("/administrator", AuthMiddleware.getVerifier("administrator"), administratorController.add.bind(administratorController));
        application.put("/administrator/:id", AuthMiddleware.getVerifier("administrator"),administratorController.edit.bind(administratorController));
        application.delete("/administrator/:aid",AuthMiddleware.getVerifier("administrator"), administratorController.delete.bind(administratorController));
    }

}

export default AdministratorRouter;