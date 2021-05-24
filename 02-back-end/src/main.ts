import * as express from 'express';
import * as cors from "cors";
import Config from './config/dev';
import BazenService from './components/bazen/service';
import BazenController from './components/bazen/controller';

const application: express.Application = express();


application.use(cors());
application.use(express.json());


const bazenService: BazenService = new BazenService();
const bazenController: BazenController = new BazenController(bazenService);

application.get("/bazen", bazenController.getAll.bind(bazenController));


application.use((req, res) => {
    res.sendStatus(404);
});

application.listen(Config.server.port);