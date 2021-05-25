import * as mysql2 from 'mysql2/promise';


interface IApplicationResorces{

    db: mysql2.Connection;

}

export default IApplicationResorces;