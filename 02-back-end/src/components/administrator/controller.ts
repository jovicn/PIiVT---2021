import BaseController from '../../common/BaseController';
import { Request, Response, NextFunction } from "express";
import { IAddAdministrator, IAddAdministratorValidator } from './dto/IAddAdministrator';
import { IEditAdministrator, IEditAdministratorValidator } from './dto/IEditAdministrator';

export default class AdministratorController extends BaseController{

    public async getAll(req: Request, res: Response, next: NextFunction){
        res.send(await this.services.administratorService.getAll());
    }

    public async getById(req: Request, res: Response, next: NextFunction){
        const id = +(req.params.id);

        if(id <= 0){
            res.sendStatus(400);
            return;
        }

        const rezultat = await this.services.administratorService.getById(id);

        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        res.send(rezultat);
    }

    public async add(req: Request, res: Response, next: NextFunction){
        const item = req.body;

        if(!IAddAdministratorValidator(item)){
            res.status(400).send(IAddAdministratorValidator.errors);
            return;
        }

        res.send(await this.services.administratorService.add(item as IAddAdministrator));
    }


    public async edit(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;
        const adminId: number = +id;

        if(adminId <= 0) {
            res.status(400).send("Pogresan ID");
            return;
        }

        const data = req.body;

        if(!IEditAdministratorValidator(data)){
            res.status(400).send(IEditAdministratorValidator.errors);
            return;
        }

        const rezultat = await this.services.administratorService.edit(adminId ,data as IEditAdministrator);

        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        res.send(rezultat);
    }


    public async delete(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.aid;
        const adminId: number = +id;

        if(adminId <= 0) {
            res.status(400).send("Pogresan ID");
            return;
        }

        const data = req.body;

        const rezultat = await this.services.administratorService.delete(adminId);

        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        res.send(rezultat);
    }



}