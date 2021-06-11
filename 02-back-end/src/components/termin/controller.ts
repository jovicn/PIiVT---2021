import TerminService from './service';
import { Request, Response, NextFunction } from "express";
import TerminModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddTermin, IAddTerminValidator } from './dto/AddTermin';
import { IEditTermin, IEditTerminValidator } from './dto/EditTermin';
import BaseController from '../../common/BaseController';

class TerminController extends BaseController{

    public async getAll(req: Request, res: Response, next: NextFunction) {
        const termini = await this.services.terminService.getAll();

        res.send(termini);
    }

    public async getById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;
        const terminId: number =+id;

        if(terminId <= 0){
            res.sendStatus(400);
            return;
        }

        const rezultat: TerminModel|null|IErrorResponse = await this.services.terminService.getById(terminId);

        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        if(rezultat instanceof TerminModel){
            res.send(rezultat);
            return;
        }

        res.status(500).send(rezultat);

    }

    public async getTerminsByBazenId(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.bid;
        const bazenId: number = +(id);
        res.send(await this.services.terminService.getTerminsByBazenId(bazenId));

    }

    public async getAllTerminsByKorisnkId(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.kid;
        const korisnikId: number = +(id);
        res.send(await this.services.terminService.getAllTerminsByKorisnkId(korisnikId));
    }

    public async getBrojSlobodnihMestaByTerminId(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.tid;
        const terminId: number = +(id);
        res.json(await this.services.terminService.getBrojSlobodnihMestaByTerminId(terminId));
    }

    public async add(req: Request, res: Response, next: NextFunction){
        const item = req.body;

        if (new Date(item.vreme).getTime() <= new Date().getTime()) { 
            res.sendStatus(400);
            return;
         }

        if(!IAddTerminValidator(item)){
            res.status(400).send(IAddTerminValidator.errors);
            return;
        }

        res.send(await this.services.terminService.add(item as IAddTermin));
    }


    public async edit(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;
        const terminId: number = +id;
        
        if(terminId <= 0){
            res.sendStatus(400);
            return;
        }
        const data = req.body;

        if(!IEditTerminValidator(data)){
            res.status(400).send(IEditTerminValidator.errors);
            return;
        }

        
        const rezultat = await this.services.terminService.edit(terminId, data as IEditTermin);
        
        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        res.send(rezultat);

    }

}

export default TerminController;