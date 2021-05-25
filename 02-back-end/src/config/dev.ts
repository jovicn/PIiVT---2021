import IConfig from '../common/IConfig.interface';

const Config: IConfig = {

    server: {
        port: 40080,
    },

    database: {
        host: "localhost",
        port: 3307,
        user: "root",
        password: "root",
        database: "praktikum",
        charset: "utf8",
        timezone: "+01:00",
    }
};

export default Config;