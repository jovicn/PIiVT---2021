import IModel from "../../common/IModel.interface";

export default class KorisnikModel implements IModel{

    korisnikId: number;
    ime: string;
    prezime: string;
    email: string;
    telefon: string;
    passwordHash: string;
    isActive: boolean;
    
}