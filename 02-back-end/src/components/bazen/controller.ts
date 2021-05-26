import BazenService from "./service";
import { Request, Response, NextFunction } from "express";
import BazenModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddBazen, IAddBazenValidator } from "./dto/AddBazen";

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

        const bazen: BazenModel|null|IErrorResponse =  await this.bazenService.getById(bazenId);

        if(bazen === null){
            res.sendStatus(404);
            return;
        }

        if(bazen instanceof BazenModel){
            res.send(bazen);
            return;
        }

        res.status(500).send(bazen);
        
    }

    async add(req: Request, res: Response, next: NextFunction){
        const data = req.body;

        if(!IAddBazenValidator(data)){
            res.status(400).send(IAddBazenValidator.errors);
            return;
        }

        const rezultat = await this.bazenService.add(data as IAddBazen);

        
        res.send(rezultat);
    }

}

export default BazenController;