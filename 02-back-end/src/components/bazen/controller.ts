import BazenService from "./service";
import { Request, Response, NextFunction } from "express";
import BazenModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddBazen, IAddBazenValidator } from "./dto/AddBazen";
import { IEditBazen, IEditBazenValidator } from "./dto/EditBazen";
import BaseController from "../../common/BaseController";

class BazenController extends BaseController{

    async getAll(req: Request, res: Response, next: NextFunction) {
        const bazeni = await this.services.bazenService.getAll();

        res.send(bazeni);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const bazenId: number = +id;

        if(bazenId <= 0) {
            res.sendStatus(400);
            return;
        }

        const bazen: BazenModel|null|IErrorResponse =  await this.services.bazenService.getById(bazenId);

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

        const rezultat = await this.services.bazenService.add(data as IAddBazen);
        res.send(rezultat);
    }

    async edit(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const bazenId: number = +id;

        if(bazenId <= 0) {
            res.status(400).send("Pogresan ID");
            return;
        }

        const data = req.body;

        if(!IEditBazenValidator(data)){
            res.status(400).send(IEditBazenValidator.errors);
            return;
        }

        const rezultat = await this.services.bazenService.edit(bazenId ,data as IEditBazen);

        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        res.send(rezultat);
    }

    async deleteById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const bazenId: number = +id;

        if(bazenId <= 0) {
            res.status(400).send("Pogresan ID");
            return;
        }
        res.send(await this.services.bazenService.delete(bazenId));

    }


}

export default BazenController;