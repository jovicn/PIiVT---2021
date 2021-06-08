import BaseService from "../../common/BaseService";
import TerminModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import { IAddTermin } from "./dto/AddTermin";
import { IEditTermin } from "./dto/EditTermin";
import { resolve } from 'path/posix';

class TerminService extends BaseService<TerminModel>{

    protected async adaptiranjeModela(data: any): Promise<TerminModel> {
        const item: TerminModel = new TerminModel();

        item.terminId = +(data?.termin_id);
        item.vreme = data?.vreme;
        item.isActive = data?.is_active;
        item.bazenId = +(data?.bazen_id);

        if(item.bazenId === null){
            return null;
        }

        return item;
    }

    public async getAll(): Promise<TerminModel[] | IErrorResponse>{
        return this.getAllFromTable("termin");
    }

    public async getById(terminId: number): Promise<TerminModel | IErrorResponse>{
        return this.getByIdFromTable("termin", terminId);
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
            const sql = `UPDATE termin SET vreme = ?, is_active = ? WHERE termin_id = ?;`;
            this.db.execute(sql , [ data.vreme, data.isActive, terminId ])
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