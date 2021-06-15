import * as express from 'express';
import * as cors from "cors";
import Config from './config/dev';
import BazenRouter from './components/bazen/router';
import * as mysql2 from 'mysql2/promise';
import IApplicationResorces from './common/IApplicationResorces.interface';
import Router from './router';
import TerminRouter from './components/termin/router';
import BazenService from './components/bazen/service';
import TerminService from './components/termin/service';
import AdministratorService from './components/administrator/service';
import AdministratorRouter from './components/administrator/router';
import KorisnikRouter from './components/korisnik/router';
import KorisnikService from './components/korisnik/service';
import StranicaService from './components/stranica/service';
import StranicaRouter from './components/stranica/router';
import AuthRouter from './components/auth/router';


async function main() {

    const application: express.Application = express();


    application.use(cors({
        origin: "http://localhost:3000",
        credential: true,
    }));
    application.use(express.json());

    const resources: IApplicationResorces = {
            db: await mysql2.createConnection({
            host: Config.database.host,
            port: Config.database.port,
            user: Config.database.user,
            password: Config.database.password,
            database: Config.database.database,
            charset: Config.database.charset,
            timezone: Config.database.timezone,
            supportBigNumbers: true,
        }),
    }

    resources.db.connect();

    resources.services = {
        bazenService: new BazenService(resources),
        terminService: new TerminService(resources),
        administratorService: new AdministratorService(resources),
        korisnikService: new KorisnikService(resources),
        stranicaService: new StranicaService(resources),
    };

    Router.setupRouter(application,resources,[
        new BazenRouter(),
        new TerminRouter(),
        new AdministratorRouter(),
        new KorisnikRouter(),
        new StranicaRouter(),
        new AuthRouter(),
    ]);
        

    application.use((req, res) => {
        res.sendStatus(404);
    });

    application.use((err, req, res, next) =>{
        res.status(500);
    });

    application.listen(Config.server.port);

}

main();