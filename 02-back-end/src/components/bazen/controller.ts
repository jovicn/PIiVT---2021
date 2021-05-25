import BazenService from "./service";
import { Request, Response, NextFunction } from "express";
import BazenModel from './model';

class BazenController {

    private bazenService: BazenService;

    constructor(bazenService: BazenService){
        this.bazenService = bazenService;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const bazeni = await this.bazenService.getAll();

        res.send(bazeni);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const bazenId: number = +id;

        if(bazenId <= 0) {
            res.sendStatus(400);
            return;
        }

        const bazen: BazenModel|null =  await this.bazenService.getById(bazenId);

        if(bazen === null){
            res.sendStatus(404);
            return;
        }
        res.send(bazen);
    }

}

export default BazenController;