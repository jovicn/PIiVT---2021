import * as express from "express";
import TerminService from './service';
import TerminController from './controller';
import IApplicationResorces from '../../common/IApplicationResorces.interface';
import IRouter from '../../common/IRouter.interface';
import AuthMiddleware from "../../middleware/auth.middleware";

class TerminRouter implements IRouter{

    public setupRoutes( application: express.Application, resources: IApplicationResorces){

        const terminController: TerminController = new TerminController(resources);

        application.get("/termini", AuthMiddleware.getVerifier("administrator", "korisnik"), terminController.getAll.bind(terminController));
        application.get("/termini/:id", AuthMiddleware.getVerifier("administrator", "korisnik"), terminController.getById.bind(terminController));
        application.get("/bazen/:bid/termini", AuthMiddleware.getVerifier("administrator", "korisnik"),terminController.getTerminsByBazenId.bind(terminController));
        application.get("/korisnik/:kid/termini", AuthMiddleware.getVerifier("administrator", "korisnik"),terminController.getAllTerminsByKorisnkId.bind(terminController));
        //application.get("/bazen/:tid/slobodna-mesta", terminController.getBrojSlobodnihMestaByTerminId.bind(terminController));
        application.post("/termini", AuthMiddleware.getVerifier("administrator"),terminController.add.bind(terminController));
        application.put("/termini/:id",AuthMiddleware.getVerifier("administrator"), terminController.edit.bind(terminController));
        application.post("/korisnik/:uid/termini/:tid",AuthMiddleware.getVerifier("korisnik"), terminController.rezervacija.bind(terminController));
        application.delete("/korisnik/:korid/termini/:terid",AuthMiddleware.getVerifier("administrator", "korisnik"),terminController.otkazivanjeRezervacije.bind(terminController));
    }

}

export default TerminRouter;