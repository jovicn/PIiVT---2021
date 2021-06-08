import * as mysql2 from 'mysql2/promise';
import IServices from './IServices.interface';


interface IApplicationResorces{

    db: mysql2.Connection;
    services?: IServices;

}

export default IApplicationResorces;