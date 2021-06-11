import BaseController from '../../common/BaseController';
import { Request, Response, NextFunction } from "express";
import { IAddStranica, IAddStranicaValidator } from './dto/IAddStranica';
import { IEditStranica, IEditStranicaValidator } from './dto/IEditStranica';

export default class StranicaController extends BaseController{

    public async getAll(req: Request, res: Response, next: NextFunction){
        res.send(await this.services.stranicaService.getAll());
    }

    public async getById(req: Request, res: Response, next: NextFunction){
        const id = +(req.params.id);

        if(id <= 0){
            res.sendStatus(400);
            return;
        }

        const rezultat = await this.services.stranicaService.getById(id);

        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        res.send(rezultat);
    }

    public async add(req: Request, res: Response, next: NextFunction){
        const item = req.body;

        if(!IAddStranicaValidator(item)){
            res.status(400).send(IAddStranicaValidator.errors);
            return;
        }

        res.send(await this.services.stranicaService.add(item as IAddStranica));
    }


    public async edit(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;
        const stranicaId: number = +id;

        if(stranicaId <= 0) {
            res.status(400).send("Pogresan ID");
            return;
        }

        const data = req.body;

        if(!IEditStranicaValidator(data)){
            res.status(400).send(IEditStranicaValidator.errors);
            return;
        }

        const rezultat = await this.services.stranicaService.edit(stranicaId ,data as IEditStranica);

        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        res.send(rezultat);
    }


    public async delete(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.sid;
        const stranicaId: number = +id;

        if(stranicaId <= 0) {
            res.status(400).send("Pogresan ID");
            return;
        }

        const data = req.body;

        const rezultat = await this.services.stranicaService.delete(stranicaId);

        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        res.send(rezultat);
    }



}