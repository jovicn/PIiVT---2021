import BazenModel from "./model";
import * as mysql2 from 'mysql2/promise';

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



    public async getAll(): Promise<BazenModel[]> {
        const lista: BazenModel[] = [];

        const sql: string = "SELECT * FROM bazen;";
        const [ rows, colums ] = await this.dbConect.execute(sql);

        if(Array.isArray(rows)){
            for(const row of rows){
                lista.push(await this.adaptiranjeModela(row));
            }
        }

        return lista;
    }

    public async getById(bazenId: number): Promise<BazenModel|null> {
        const sql: string = "SELECT * FROM bazen WHERE bazen_id = ?;";
        const [ rows, colums ] = await this.dbConect.execute(sql, [bazenId]);

        if (!Array.isArray(rows)){
            return null;
        }

        if(rows.length === 0){
            return null;
        }

        return await this.adaptiranjeModela(rows[0]);

    }



}

export default BazenService;