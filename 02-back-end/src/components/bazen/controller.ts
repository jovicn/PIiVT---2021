import BazenService from "./service";
import { Request, Response, NextFunction } from "express";

class BazenController {

    private bazenService: BazenService;

    constructor(bazenService: BazenService){
        this.bazenService = bazenService;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const bazeni = await this.bazenService.getAll();

        res.send(bazeni);
    }

}

export default BazenController;