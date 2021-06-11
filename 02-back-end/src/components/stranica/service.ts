import BaseService from "../../common/BaseService";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IAddStranica } from "./dto/IAddStranica";
import StranicaModel from "./model";
import IErrorResponse from '../../common/IErrorResponse.interface';
import * as bcrypt from 'bcrypt';
import { IEditStranica } from "./dto/IEditStranica";

class StranicaModelAdapterOption implements IModelAdapterOptions{

}

class StranicaService extends BaseService<StranicaModel>{
    protected async adaptiranjeModela(data: any, options: Partial<IModelAdapterOptions>): Promise<StranicaModel> {
        const item = new StranicaModel();

        item.stranicaId = +(data?.stranica_id);
        item.naziv = data?.naziv;
        item.tekst = data?.tekst;

        return item;
    }

    public async getAll(): Promise<StranicaModel[]>{
        return await this.getAllFromTable("stranica", {}) as StranicaModel[];
    }

    public async getById(stranicaId: number): Promise<StranicaModel|null>{
        return await this.getByIdFromTable("stranica", stranicaId, {}) as StranicaModel | null;
    }

    public async add(data: IAddStranica): Promise<StranicaModel | IErrorResponse>{
        return new Promise<StranicaModel|IErrorResponse>(async resolve => {

            this.db.execute(
                `INSERT stranica SET naziv = ?, tekst = ?;`,
                [data.naziv, data.tekst]
            ).then(async res => {
                const novaStranicaId: number = +((res[0] as any)?.insertId);
                resolve(await this.getById(novaStranicaId));
            }).catch(error =>{
                    resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            });
        });
    } 

    public async edit(stranicaId: number, data: IEditStranica): Promise<StranicaModel|IErrorResponse|null>{
        const staraStranica = await this.getById(stranicaId);

        if(staraStranica === null){
            return null;
        }

        if(!(staraStranica instanceof StranicaModel)){
            return null;
        }

        return new Promise<StranicaModel | IErrorResponse>(async resolve => {

            const sql = "UPDATE stranica SET naziv = ?, tekst = ?  WHERE stranica_id = ?;";

            this.db.execute(sql, [data.naziv, data.tekst, stranicaId])
                .then(async rezultat => {
                    resolve(await this.getById(stranicaId));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                });
            });
        }

        public async delete(stranicaId: number): Promise<IErrorResponse> {
            return new Promise<IErrorResponse>(async resolve => {
                this.db.execute(
                    `DELETE FROM stranica WHERE stranica_id = ?;`,
                    [ stranicaId ]
                )
                .then(res => {
                    resolve({
                        errorCode: 0,
                        errorMessage: `Deleted ${(res as any[])[0]?.affectedRows} records.`
                    });
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

export default StranicaService;