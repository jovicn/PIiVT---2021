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


async function main() {

    const application: express.Application = express();


    application.use(cors());
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
    };

    Router.setupRouter(application,resources,[
        new BazenRouter(),
        new TerminRouter(),
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