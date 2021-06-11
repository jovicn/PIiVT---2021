import BaseController from '../../common/BaseController';
import { Request, Response, NextFunction } from "express";
import { IAddKorisnik, IAddKorisnikValidator } from './dto/IAddKorisnik';
import { IEditKorisnik, IEditKorisnikValidator } from './dto/IEditKorisnik';

export default class KorisnikController extends BaseController{

    public async getAll(req: Request, res: Response, next: NextFunction){
        res.send(await this.services.korisnikService.getAll());
    }

    public async getById(req: Request, res: Response, next: NextFunction){
        const id = +(req.params.id);

        if(id <= 0){
            res.sendStatus(400);
            return;
        }

        const rezultat = await this.services.korisnikService.getById(id);

        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        res.send(rezultat);
    }

    public async add(req: Request, res: Response, next: NextFunction){
        const item = req.body;

        if(!IAddKorisnikValidator(item)){
            res.status(400).send(IAddKorisnikValidator.errors);
            return;
        }

        res.send(await this.services.korisnikService.add(item as IAddKorisnik));
    }


    public async edit(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;
        const korisnikId: number = +id;

        if(korisnikId <= 0) {
            res.status(400).send("Pogresan ID");
            return;
        }

        const data = req.body;

        if(!IEditKorisnikValidator(data)){
            res.status(400).send(IEditKorisnikValidator.errors);
            return;
        }

        const rezultat = await this.services.korisnikService.edit(korisnikId, data as IEditKorisnik);

        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        res.send(rezultat);
    }


    public async delete(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.kid;
        const korisnikId: number = +id;

        if(korisnikId <= 0) {
            res.status(400).send("Pogresan ID");
            return;
        }

        const data = req.body;

        const rezultat = await this.services.korisnikService.delete(korisnikId);

        if(rezultat === null){
            res.sendStatus(404);
            return;
        }

        res.send(rezultat);
    }



}