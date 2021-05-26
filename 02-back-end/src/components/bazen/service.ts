import BazenModel from "./model";
import * as mysql2 from 'mysql2/promise';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { resolve } from "path/posix";
import { IAddBazen } from "./dto/AddBazen";

class BazenService {

    private dbConect: mysql2.Connection;

    constructor(dbConect: mysql2.Connection){
        this.dbConect = dbConect;
    }

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
        return new Promise<BazenModel[] | IErrorResponse>(async (resolve) => {

            const sql: string = "SELECT * FROM bazen;";

            this.dbConect.execute(sql)
            .then(async (rezultat) =>{

                const rows = rezultat[0];
                const lista: BazenModel[] = [];

                if(Array.isArray(rows)){
                    for(const row of rows){
                        lista.push(await this.adaptiranjeModela(row));
                    }
                }
        
                resolve(lista);

            }).catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage:error?.sqlMessage
                });

            });   
        });
    } 

    public async getById(bazenId: number): Promise<BazenModel|null|IErrorResponse> {
        return new Promise<BazenModel|null|IErrorResponse>(async resolve => {

            const sql: string = "SELECT * FROM bazen WHERE bazen_id = ?;";
            this.dbConect.execute(sql, [bazenId])
            .then(async rezultat => {
                const [ rows, colums ] = rezultat; 

                if (!Array.isArray(rows)){
                    resolve(null);
                    return;
                }
    
                if(rows.length === 0){
                    resolve(null);
                    return;
                }
    
                resolve(await this.adaptiranjeModela(
                    rows[0])
                    )

            }).catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage:error?.sqlMessage
                });
            }); 
        }); 
    }

    public async add(data: IAddBazen): Promise<BazenModel | IErrorResponse> {
        return new Promise<BazenModel | IErrorResponse>(async resolve => {
            const sql = "INSERT bazen SET ime = ?, adresa = ?, grad = ?, broj_mesta = ?;";

            this.dbConect.execute(sql, [ data.ime, data.adresa, data.grad, data.brojMesta])
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
}

export default BazenService;