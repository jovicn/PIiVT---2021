import BaseService from "../../common/BaseService";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import { IAddKorisnik } from "./dto/IAddKorisnik";
import KorisnikModel from "./model";
import IErrorResponse from '../../common/IErrorResponse.interface';
import * as bcrypt from 'bcrypt';
import { IEditKorisnik } from "./dto/IEditKorisnik";

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
                `INSERT korisnik SET ime = ?, prezime = ?, email = ?, telefon = ?, password_hash = ?;`,
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

            const sql = "UPDATE korisnik SET ime = ?, prezime = ?, email = ?, telefon = ?, password_hash = ? WHERE korisnik_id = ?;";

            this.db.execute(sql, [data.ime, data.prezime, data.email, data.telefon, passwordHash, korisnikId])
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

        public async delete(korisnikId: number): Promise<IErrorResponse> {
            return new Promise<IErrorResponse>(async resolve => {
                this.db.execute(
                    `DELETE FROM korisnik WHERE korisnik_id = ?;`,
                    [ korisnikId, ]
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

export default KorisnikService;