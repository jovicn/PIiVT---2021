import * as express from "express";
import AuthController from './controller';
import IApplicationResorces from '../../common/IApplicationResorces.interface';
import IRouter from '../../common/IRouter.interface';

class AuthRouter implements IRouter{

    public setupRoutes( application: express.Application, resources: IApplicationResorces){
        const authController: AuthController = new AuthController(resources);

        application.post("/auth/korisnik/login", authController.korisnikLogin.bind(authController));
        application.post("/auth/administrator/login", authController.administratorLogin.bind(authController));
    }

}

export default AuthRouter;