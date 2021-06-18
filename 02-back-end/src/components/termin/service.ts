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
        item.zakazanAt = data?.zakazan_at;
        item.status = data?.status;
        item.bazenId = +(data?.bazen_id);
        
        
        if (options.loadBazen) {
            
            const rezultat = await this.services.bazenService.getById(item.bazenId);
            item.brojSlobodnihMesta = await this.getBrojSlobodnihMestaByTerminId(item.terminId, rezultat as BazenModel);
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
    

    public async getBrojZauzetihMestaByTerminId(terminId: number, ): Promise<number> {
        const sql = `SELECT COUNT(korisnik_id) AS zauzetihMesta FROM korisnik_termin WHERE termin_id = ?`
        const [rows, colums] = await this.db.execute(sql, [ terminId]);


        return +(rows[0].zauzetihMesta);
    }

    public async getBrojSlobodnihMestaByTerminId(terminId: number,  bazen: BazenModel): Promise<number> {
        const termin = await this.getByIdFromTable<TerminModelAdapterOptions>("termin", terminId);

        if(!(termin instanceof TerminModel)){
            return 0;
        }

        const brojMesta = bazen.brojSlobodnihMesta;
        const brojZauzetihMesta = await this.getBrojZauzetihMestaByTerminId(termin.terminId);
        return brojMesta - brojZauzetihMesta;
    }

  /*  public async getBrojSlobodnihMestaByTerminId(terminId: number, ): Promise<number> {
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
    }*/

    public async add(data: IAddTermin): Promise<TerminModel|IErrorResponse>{
        return new Promise<TerminModel|IErrorResponse>(resolve =>{
            const sql = "INSERT termin SET zakazan_at = ?, bazen_id = ?";

            this.db.execute(sql, [data.zakazanAt, data.bazenId])
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
            const sql = `UPDATE termin SET zakazan_at = ?, status = ? WHERE termin_id = ?;`;
            this.db.execute(sql , [ data.zakazanAt, data.status, terminId ])
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

    public async rezervacija(korisnikId: number, terminId: number ): Promise<TerminModel | IErrorResponse>{
        return new Promise<TerminModel|IErrorResponse>(resolve =>{
            const sql = `INSERT korisnik_termin SET korisnik_id = ?, termin_id = ?;`;
            this.db.execute(sql, [korisnikId, terminId])

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

    public async otkazivanjeRezervacije(korisnikId: number, terminId: number): Promise<IErrorResponse>{
        return new Promise<IErrorResponse>(resolve => {
            const sql = `DELETE FROM korisnik_termin WHERE korisnik_id = ? AND termin_id = ?;`;
            this.db.execute(sql,[ korisnikId, terminId ])
                .then(async rezultat => {
                    const deletetInfo: any = rezultat[0];
                    const obrisaniRedovi: number = +(deletetInfo?.affectedRows);

                    if(obrisaniRedovi === 1){
                        resolve({
                            errorCode: 0,
                            errorMessage: "Uspesno obrisano"
                        });
                    }else{
                        resolve({
                            errorCode: -1,
                            errorMessage: "Neuspesno obrisano"
                        })
                    }
                }).catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                    
                });       
        })
    }

}

export default TerminService;