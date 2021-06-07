import IModel from '../../common/IModel.interface';

class TerminModel implements IModel {

    terminId: number;
    vreme: string;
    isActive: "aktivan"|"otkazan"|"istekao";
    bazenId: number;

}

export default TerminModel;