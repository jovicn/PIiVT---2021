import BazenModel from "./model";
import * as mysql2 from 'mysql2/promise';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { resolve } from "path/posix";
import { IAddBazen } from "./dto/AddBazen";
import BaseService from "../../services/BaseService";
import { IEditBazen } from "./dto/EditBazen";

class BazenService extends BaseService<BazenModel>{

    protected async adaptiranjeModela(row: any): Promise<BazenModel>{
        const item: BazenModel = new BazenModel();

        item.bazenId = +(row?.bazen_id);
        item.ime = row?.ime;
        item.adresa = row?.adresa;
        item.grad =  row?.grad;
        item.brojSlobodnihMesta = +(row?.broj_mesta);

        return item;
    }

    public async getAll(): Promise<BazenModel[] | IErrorResponse>{
        return this.getAllFromTable("bazen");
    } 

    public async getById(bazenId: number): Promise<BazenModel|null|IErrorResponse> {
        return this.getByIdFromTable("bazen", bazenId);
    }

    public async add(data: IAddBazen): Promise<BazenModel | IErrorResponse> {
        return new Promise<BazenModel | IErrorResponse>(async resolve => {
            const sql = "INSERT bazen SET ime = ?, adresa = ?, grad = ?, broj_mesta = ?;";

            this.db.execute(sql, [ data.ime, data.adresa, data.grad, data.brojMesta])
                .then(async rezultat => {
                    const insertInfo: any = rezultat[0];

                    const noviBazenId: number = +(insertInfo?.insertId);
                    resolve(await this.getById(noviBazenId));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                });
        });
    }

    public async edit(bazenId: number, data: IEditBazen): Promise<BazenModel|IErrorResponse|null>{
        const stariBazen = await this.getById(bazenId);

        if(stariBazen === null){
            return null;
        }

        if(!(stariBazen instanceof BazenModel)){
            return null;
        }

        return new Promise<BazenModel | IErrorResponse>(async resolve => {
            const sql = "UPDATE  bazen SET ime = ?, adresa = ?, grad = ?, broj_mesta = ? WHERE bazen_id = ?;";

            this.db.execute(sql, [ data.ime, data.adresa, data.grad, data.brojMesta, bazenId])
                .then(async rezultat => {
                    resolve(await this.getById(bazenId));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                });
        });
    }

    public async delete(bazenId: number): Promise<IErrorResponse>{
        return new Promise<IErrorResponse>(resolve => {
            const sql = `DELETE FROM bazen WHERE bazen_id = ?;`;
            this.db.execute(sql,[ bazenId ])
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

export default BazenService;