import BaseService from "../../common/BaseService";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IAddAdministrator } from "./dto/IAddAdministrator";
import AdministratorModel from "./model";
import IErrorResponse from '../../common/IErrorResponse.interface';
import * as bcrypt from 'bcrypt';
import { IEditAdministrator } from "./dto/IEditAdministrator";

class AdministratorModelAdapterOption implements IModelAdapterOptions{

}

class AdministratorService extends BaseService<AdministratorModel>{
    protected async adaptiranjeModela(data: any, options: Partial<IModelAdapterOptions>): Promise<AdministratorModel> {
        const item = new AdministratorModel();

        item.administratorId = +(data?.administrator_id);
        item.username = data?.username;
        item.passwordHash = data?.password_hash;
        item.isActive = +(data?.is_active) === 1;

        return item;
    }

    public async getAll(): Promise<AdministratorModel[]>{
        return await this.getAllFromTable("administrator", {}) as AdministratorModel[];
    }

    public async getById(administratorId: number): Promise<AdministratorModel|null>{
        return await this.getByIdFromTable("administrator", administratorId, {}) as AdministratorModel | null;
    }

    public async add(data: IAddAdministrator): Promise<AdministratorModel | IErrorResponse>{
        return new Promise<AdministratorModel|IErrorResponse>(async resolve => {

            const passwordHash = bcrypt.hashSync(data.password, 10);

            this.db.execute(
                `INSERT administrator SET username = ?, password_hash = ?, is_active = 1;`,
                [data.username, passwordHash]
            ).then(async res => {
                const noviAdminId: number = +((res[0] as any)?.insertId);
                resolve(await this.getById(noviAdminId));
            }).catch(error =>{
                    resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            });
        });
    } 

    public async edit(adminId: number, data: IEditAdministrator): Promise<AdministratorModel|IErrorResponse|null>{
        const stariAdmin = await this.getById(adminId);

        if(stariAdmin === null){
            return null;
        }

        if(!(stariAdmin instanceof AdministratorModel)){
            return null;
        }

        return new Promise<AdministratorModel | IErrorResponse>(async resolve => {

            const passwordHash = bcrypt.hashSync(data.password, 10);

            const sql = "UPDATE administrator SET password_hash = ?, is_active = ?  WHERE administrator_id = ?;";

            this.db.execute(sql, [passwordHash, data.isActive ? 1 : 0, adminId])
                .then(async rezultat => {
                    resolve(await this.getById(adminId));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                });
            });
        }

        public async delete(adminId: number): Promise<AdministratorModel|IErrorResponse>{
            const stariAdmin = await this.getById(adminId);
    
            if(stariAdmin === null){
                return null;
            }
    
            if(!(stariAdmin instanceof AdministratorModel)){
                return null;
            }
    
            return new Promise<AdministratorModel | IErrorResponse>(async resolve => {
    
               const sql = "UPDATE administrator SET is_active = 0  WHERE administrator_id = ?;";
    
                this.db.execute(sql, [ adminId ])
                    .then(async rezultat => {
                        resolve(await this.getById(adminId));
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

export default AdministratorService;