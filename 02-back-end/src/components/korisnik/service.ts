import BaseService from "../../common/BaseService";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IAddKorisnik } from "./dto/IAddKorisnik";
import KorisnikModel from "./model";
import IErrorResponse from '../../common/IErrorResponse.interface';
import * as bcrypt from 'bcrypt';
import { IEditKorisnik } from "./dto/IEditKorisnik";
import TerminModel from "../termin/model";
import { IAddTermin } from "../termin/dto/AddTermin";
import { resolve } from 'path/posix';

class KorisnikModelAdapterOption implements IModelAdapterOptions{

}

class KorisnikService extends BaseService<KorisnikModel>{
    protected async adaptiranjeModela(data: any, options: Partial<IModelAdapterOptions>): Promise<KorisnikModel> {
        const item = new KorisnikModel();

        item.korisnikId = +(data?.korisnik_id);
        item.ime = data?.ime;
        item.prezime = data?.prezime;
        item.email = data?.email;
        item.telefon = data?.telefon;
        item.passwordHash = data?.password_hash;
        item.isActive = +(data?.is_active) === 1;

        return item;
    }

    public async getAll(): Promise<KorisnikModel[]>{
        return await this.getAllFromTable("korisnik", {}) as KorisnikModel[];
    }

    public async getById(korisnikId: number): Promise<KorisnikModel|null>{
        return await this.getByIdFromTable("korisnik", korisnikId, {}) as KorisnikModel | null;
    }

    public async getByEmail(email: string): Promise<KorisnikModel|null>{
        const korisnici = await this.getAllByFiledName("korisnik", "email", email);
        
        if(!Array.isArray(korisnici) || korisnici.length === 0){
            return null;
        }

        return korisnici[0];
    }

    public async add(data: IAddKorisnik): Promise<KorisnikModel | IErrorResponse>{
        return new Promise<KorisnikModel|IErrorResponse>(async resolve => {

            const passwordHash = bcrypt.hashSync(data.password, 10);

            this.db.execute(
                `INSERT korisnik SET ime = ?, prezime = ?, email = ?, telefon = ?, password_hash = ?, is_active = 1;`,
                [data.ime, data.prezime, data.email, data.telefon, passwordHash]
            ).then(async res => {
                const noviKorisnikId: number = +((res[0] as any)?.insertId);
                resolve(await this.getById(noviKorisnikId));
            }).catch(error =>{
                    resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            });
        });
    } 

    public async edit(korisnikId: number, data: IEditKorisnik): Promise<KorisnikModel|IErrorResponse|null>{
        const stariKorisnik = await this.getById(korisnikId);

        if(stariKorisnik === null){
            return null;
        }

        if(!(stariKorisnik instanceof KorisnikModel)){
            return null;
        }

        return new Promise<KorisnikModel | IErrorResponse>(async resolve => {

            const passwordHash = bcrypt.hashSync(data.password, 10);

            const sql = "UPDATE korisnik SET ime = ?, prezime = ?, email = ?, telefon = ?, password_hash = ?, is_active = ? WHERE korisnik_id = ?;";

            this.db.execute(sql, [data.ime, data.prezime, data.email, data.telefon, passwordHash, data.isActive ? 1 : 0,korisnikId])
                .then(async rezultat => {
                    resolve(await this.getById(korisnikId));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                });
            });
        }

        public async delete(korisnikId: number): Promise<KorisnikModel | IErrorResponse> {
            const stariKorisnik = await this.getById(korisnikId);
    
            if(stariKorisnik === null){
                return null;
            }
    
            if(!(stariKorisnik instanceof KorisnikModel)){
                return null;
            }
    
            return new Promise<KorisnikModel | IErrorResponse>(async resolve => {
    
               const sql = "UPDATE korisnik SET is_active = 0  WHERE korisnik_id = ?;";
    
                this.db.execute(sql, [ korisnikId ])
                    .then(async rezultat => {
                        resolve(await this.getById(korisnikId));
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

export default KorisnikService;