import IRouter from "../../common/IRouter.interface";
import * as express from 'express';
import IApplicationResorces from "../../common/IApplicationResorces.interface";
import StranicaController from "./controller";

class StranicaRouter implements IRouter{

    public setupRoutes( application: express.Application, resources: IApplicationResorces){

        const stranicaController: StranicaController = new StranicaController(resources);

        application.get("/stranica", stranicaController.getAll.bind(stranicaController));
        application.get("/stranica/:id", stranicaController.getById.bind(stranicaController));
        application.post("/stranica", stranicaController.add.bind(stranicaController));
        application.put("/stranica/:id", stranicaController.edit.bind(stranicaController));
        application.delete("/stranica/:sid", stranicaController.delete.bind(stranicaController));
    }

}

export default StranicaRouter;