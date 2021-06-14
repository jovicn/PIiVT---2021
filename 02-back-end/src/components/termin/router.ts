import * as express from "express";
import TerminService from './service';
import TerminController from './controller';
import IApplicationResorces from '../../common/IApplicationResorces.interface';
import IRouter from '../../common/IRouter.interface';

class TerminRouter implements IRouter{

    public setupRoutes( application: express.Application, resources: IApplicationResorces){

        const terminController: TerminController = new TerminController(resources);

        application.get("/termini", terminController.getAll.bind(terminController));
        application.get("/termini/:id", terminController.getById.bind(terminController));
        application.get("/bazen/:bid/termini", terminController.getTerminsByBazenId.bind(terminController));
        application.get("/korisnik/:kid/termini", terminController.getAllTerminsByKorisnkId.bind(terminController));
        //application.get("/bazen/:tid/slobodna-mesta", terminController.getBrojSlobodnihMestaByTerminId.bind(terminController));
        application.post("/termini", terminController.add.bind(terminController));
        application.put("/termini/:id", terminController.edit.bind(terminController));
        application.post("/korisnik/:uid/termini/:tid", terminController.rezervacija.bind(terminController));
    }

}

export default TerminRouter;