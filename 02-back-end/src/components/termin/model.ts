import IModel from '../../common/IModel.interface';
import BazenModel from '../bazen/model';

class TerminModel implements IModel {

    terminId: number;
    vreme: string;
    isActive: "aktivan"|"otkazan"|"istekao";
    bazenId: number;
    bazen: BazenModel | null;

}

export default TerminModel;