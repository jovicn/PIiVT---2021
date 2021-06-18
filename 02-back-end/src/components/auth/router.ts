import * as express from "express";
import AuthController from './controller';
import IApplicationResorces from '../../common/IApplicationResorces.interface';
import IRouter from '../../common/IRouter.interface';
import KorisnikController from "../korisnik/controller";

class AuthRouter implements IRouter{

    public setupRoutes( application: express.Application, resources: IApplicationResorces){
        const authController: AuthController = new AuthController(resources);
        const korisnikController: KorisnikController = new KorisnikController(resources);

        application.post("/auth/korisnik/login", authController.korisnikLogin.bind(authController));
        application.post("/auth/administrator/login", authController.administratorLogin.bind(authController));

        application.post("/auth/korisnik/register",  korisnikController.add.bind(korisnikController));

        application.post("/auth/korisnik/refresh", authController.korisnikRefresh.bind(authController));
        application.post("/auth/administrator/refresh", authController.administratorRefresh.bind(authController));
    }

}

export default AuthRouter;