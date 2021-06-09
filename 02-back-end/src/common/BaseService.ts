import IModel from './IModel.interface';
import * as mysql2 from 'mysql2/promise';
import BazenModel from '../components/bazen/model';
import IErrorResponse from './IErrorResponse.interface';
import IApplicationResorces from './IApplicationResorces.interface';
import IServices from './IServices.interface';
import IModelAdapterOptions from './IModelAdapterOptions.interface';

export default abstract class BaseService<PovratniModel extends IModel> {

    private resources: IApplicationResorces;
    

    constructor(resources: IApplicationResorces){
        this.resources = resources;
    }

    protected get db(): mysql2.Connection{
        return this.resources.db;
    }

    protected get services(): IServices{
        return this.resources.services;
    }

    protected abstract adaptiranjeModela(data: any, options: Partial<IModelAdapterOptions>): Promise<PovratniModel>;



    protected async getAllFromTable<AdapterOptions extends IModelAdapterOptions>(imeTabele: string, options: Partial<AdapterOptions> = {}): Promise<PovratniModel[] | IErrorResponse>{
        return new Promise<PovratniModel[] | IErrorResponse>(async (resolve) => {

            const sql: string =`SELECT * FROM ${imeTabele};`;

            this.db.execute(sql)
            .then(async (rezultat) =>{

                const rows = rezultat[0];
                const lista: PovratniModel[] = [];

                if(Array.isArray(rows)){
                    for(const row of rows){
                        lista.push(await this.adaptiranjeModela(row,options));
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


    protected async getByIdFromTable<AdapterOptions extends IModelAdapterOptions>(imeTabele: string, id: number, options: Partial<AdapterOptions> = {}): Promise<PovratniModel|null|IErrorResponse>{
        return new Promise<PovratniModel|null|IErrorResponse>(async resolve => {

            const sql: string = `SELECT * FROM ${imeTabele} WHERE ${imeTabele}_id = ?;`;
            this.db.execute(sql, [id])
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
                    rows[0], options)
                    )

            }).catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage:error?.sqlMessage
                });
            }); 
        }); 
    }
    

    protected async getAllByFiledName<AdapterOptions extends IModelAdapterOptions>(imeTabele: string, filedName: string, filedValue: any, options: Partial<AdapterOptions> = {}): Promise<PovratniModel[]|IErrorResponse>{
        return new Promise<PovratniModel[] | IErrorResponse>(async (resolve) => {

            let sql =`SELECT * FROM ${imeTabele} WHERE ${filedName} = ?;`;

            if (filedValue === null) {
                sql = `SELECT * FROM ${imeTabele} WHERE ${filedName} IS NULL;`;
            }
            
            this.db.execute(sql, [ filedValue ]) 
            .then(async rezultat => {
                
                const rows = rezultat[0];
                const lista: PovratniModel[] = [];

                if(Array.isArray(rows)){
                    for(const row of rows){
                        lista.push(await this.adaptiranjeModela(row, options))
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

}