import IModel from "../../common/IModel.interface";

export default class KorisnikModel implements IModel{

    stranicaId: number;
    naziv: string;
    tekst: string;
}