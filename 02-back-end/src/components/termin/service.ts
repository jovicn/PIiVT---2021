import BaseService from "../../common/BaseService";
import TerminModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddTermin } from "./dto/AddTermin";
import { IEditTermin } from "./dto/EditTermin";
import { resolve } from 'path/posix';
import BazenModel from "../bazen/model";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";


class TerminModelAdapterOptions implements IModelAdapterOptions{
    loadBazen: boolean = false;
}


class TerminService extends BaseService<TerminModel>{

    protected async adaptiranjeModela(data: any, options: Partial<TerminModelAdapterOptions>): Promise<TerminModel> {
        const item: TerminModel = new TerminModel();

        item.terminId = +(data?.termin_id);
        item.vreme = data?.vreme;
        item.status = data?.status;
        item.bazenId = +(data?.bazen_id);

        if (options.loadBazen) {
            const rezultat = await this.services.bazenService.getById(item.bazenId);
            item.bazen = rezultat as BazenModel;
        }

        return item;
    }

    public async getAll(): Promise<TerminModel[] | IErrorResponse>{
        return this.getAllFromTable<TerminModelAdapterOptions>("termin", { loadBazen: true, });
    }

    public async getById(terminId: number, options: Partial<TerminModelAdapterOptions> = {}): Promise<TerminModel | IErrorResponse>{
        return this.getByIdFromTable("termin", terminId, options);
    }

    public async getTerminsByBazenId(bazenId: number): Promise<TerminModel[] | IErrorResponse>{
         return await this.getAllByFiledName("termin", "bazen_id", bazenId);
    }

    public async getAllTerminsByKorisnkId(korisnikId: number, ): Promise<TerminModel[]> {
        const sql = `SELECT termin.* FROM termin INNER JOIN korisnik_termin ON korisnik_termin.termin_id = termin.termin_id WHERE korisnik_id = ?;`;
        
        const [rows, colums] = await this.db.execute(sql, [ korisnikId ])
            
            const lista: TerminModel[] = [];

                if(Array.isArray(rows)){
                    for(const row of rows){
                        lista.push(await this.adaptiranjeModela(row, {loadBazen: true}));
                    }
                }
                return lista;
    }

    public async getBrojSlobodnihMestaByTerminId(terminId: number, ): Promise<number> {
        const sql = `SELECT
        (
        (SELECT broj_mesta FROM bazen INNER JOIN termin ON bazen.bazen_id = termin.bazen_id WHERE termin.termin_id = ?)
        -
        (SELECT COUNT(korisnik_termin.termin_id) FROM korisnik_termin WHERE termin_id = ? GROUP BY termin_id)
        ) AS broj_preostalih_slobodnih_mesta
        FROM termin
        WHERE
        termin_id = ?`;
        
        const [rows, colums] = await this.db.execute(sql, [ terminId, terminId, terminId ])
            
            let brojMesta: number = 0;
            
                if(Array.isArray(rows)){
                  brojMesta = (rows[0] as any)?.broj_preostalih_slobodnih_mesta;  
                   
                }
                return brojMesta;
    }

    public async add(data: IAddTermin): Promise<TerminModel|IErrorResponse>{
        return new Promise<TerminModel|IErrorResponse>(resolve =>{
            const sql = "INSERT termin SET vreme = ?, bazen_id = ?";

            this.db.execute(sql, [data.vreme, data.bazenId])
            .then(async rezultat =>{
                const insertInfo: any = rezultat[0];
                const noviId: number = +(insertInfo?.insertId);
                resolve(await this.getById(noviId));

            }).catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            });
        });
    }

    public async edit(terminId: number, data: IEditTermin): Promise<TerminModel|IErrorResponse|null>{
        const stariTermin = await this.getById(terminId);

        if(stariTermin === null){
            return null;
        }

        if(!(stariTermin instanceof TerminModel)){
            return null;
        }

        return new Promise<TerminModel|IErrorResponse>(async resolve => {
            const sql = `UPDATE termin SET vreme = ?, status = ? WHERE termin_id = ?;`;
            this.db.execute(sql , [ data.vreme, data.status, terminId ])
            .then(async rezultat => {
                resolve(await this.getById(terminId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            });
        });
    }

}

export default TerminService;