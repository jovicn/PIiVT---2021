import IRouter from "../../common/IRouter.interface";
import * as express from 'express';
import IApplicationResorces from "../../common/IApplicationResorces.interface";
import KorisnikController from "./controller";

class KorisnikRouter implements IRouter{

    public setupRoutes( application: express.Application, resources: IApplicationResorces){

        const korisnikController: KorisnikController = new KorisnikController(resources);

        application.get("/korisnik", korisnikController.getAll.bind(korisnikController));
        application.get("/korisnik/:id", korisnikController.getById.bind(korisnikController));
        application.post("/korisnik", korisnikController.add.bind(korisnikController));
        application.put("/korisnik/:id", korisnikController.edit.bind(korisnikController));
        application.delete("/korisnik/:kid", korisnikController.delete.bind(korisnikController));
    }

}

export default KorisnikRouter;