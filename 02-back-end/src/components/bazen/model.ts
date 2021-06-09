import IModel from '../../common/IModel.interface';
class BazenModel implements IModel {

    bazenId: number;
    ime: string;
    adresa: string;
    grad: string;
    brojSlobodnihMesta: number;
    telefon: string;

}

export default BazenModel;