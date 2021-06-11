import IRouter from "../../common/IRouter.interface";
import * as express from 'express';
import IApplicationResorces from "../../common/IApplicationResorces.interface";
import AdministratorController from "./controller";

class AdministratorRouter implements IRouter{

    public setupRoutes( application: express.Application, resources: IApplicationResorces){

        const administratorController: AdministratorController = new AdministratorController(resources);

        application.get("/administrator", administratorController.getAll.bind(administratorController));
        application.get("/administrator/:id", administratorController.getById.bind(administratorController));
        application.post("/administrator", administratorController.add.bind(resources));
        application.put("/administrator/:id", administratorController.edit.bind(administratorController));
        application.delete("/administrator/:aid", administratorController.delete.bind(administratorController));
    }

}

export default AdministratorRouter;