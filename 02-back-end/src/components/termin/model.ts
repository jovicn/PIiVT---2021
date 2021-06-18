import IModel from '../../common/IModel.interface';
import BazenModel from '../bazen/model';

class TerminModel implements IModel {

    terminId: number;
    zakazanAt: string;
    status: "aktivan"|"otkazan";
    bazenId: number;
    bazen: BazenModel | null;
    brojSlobodnihMesta: number;

}

export default TerminModel;