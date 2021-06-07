import TerminService from './service';
import { Request, Response, NextFunction } from "express";
import TerminModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddTermin, IAddTerminValidator } from './dto/AddTermin';
import { IEditTermin, IEditTerminValidator } from './dto/EditTermin';

class TerminController{

    private terminService: TerminService;

    constructor(terminService: TerminService){
        this.terminService = terminService;
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        const termini = await this.terminService.getAll();

        res.send(termini);
    }

    public async getById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;
        const terminId: number =+id;

        if(terminId <= 0){
            res.sendStatus(400);
            return;
        }

        const rezultat: TerminModel|null|IErrorResponse = await this.terminService.getById(terminId);

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

    public async add(req: Request, res: Response, next: NextFunction){
        const item = req.body;

        if(!IAddTerminValidator(item)){
            res.status(400).send(IAddTerminValidator.errors);
            return;
        }

        res.send(await this.terminService.add(item as IAddTermin));
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

        
        const rezultat = await this.terminService.edit(terminId, data as IEditTermin);
        
        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        res.send(rezultat);

    }

}

export default TerminController;