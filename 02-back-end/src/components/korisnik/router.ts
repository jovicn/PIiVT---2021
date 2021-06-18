import IRouter from "../../common/IRouter.interface";
import * as express from 'express';
import IApplicationResorces from "../../common/IApplicationResorces.interface";
import KorisnikController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

class KorisnikRouter implements IRouter{

    public setupRoutes( application: express.Application, resources: IApplicationResorces){

        const korisnikController: KorisnikController = new KorisnikController(resources);

        application.get("/korisnik", AuthMiddleware.getVerifier("administrator"),korisnikController.getAll.bind(korisnikController));
        application.get("/korisnik/:id", AuthMiddleware.getVerifier("administrator"),korisnikController.getById.bind(korisnikController));
        application.post("/korisnik", AuthMiddleware.getVerifier("administrator"),korisnikController.add.bind(korisnikController));
        application.put("/korisnik/:id", AuthMiddleware.getVerifier("administrator"),korisnikController.edit.bind(korisnikController));
        application.delete("/korisnik/:kid",AuthMiddleware.getVerifier("administrator"),korisnikController.delete.bind(korisnikController));
    }

}

export default KorisnikRouter;