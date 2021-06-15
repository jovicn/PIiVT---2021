import IConfig from '../common/IConfig.interface';
import {readFileSync} from 'fs'


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
    },
    auth:{
        korisnik:{
            algorithm:"RS256",
            izdavac: "localhost",
            auth:{
                trajanje: 60*60*24*7,
                public: readFileSync("keystore/korisnik-auth.public", "utf-8"),
                private:readFileSync("keystore/korisnik-auth.private", "utf-8"),
            },
            refresh:{
                trajanje: 60*60*24*365,
                public: readFileSync("keystore/korisnik-refresh.public", "utf-8"),
                private:readFileSync("keystore/korisnik-refresh.private", "utf-8"),
            }
        },
        administrator:{
            algorithm: "RS256",
            izdavac: "localhost",
            auth:{
                trajanje: 60*60*24*7,
                public: readFileSync("keystore/administrator-auth.public", "utf-8"),
                private:readFileSync("keystore/administrator-auth.private", "utf-8"),
            },
            refresh:{
                trajanje: 60*60*24*365,
                public: readFileSync("keystore/administrator-refresh.public", "utf-8"),
                private:readFileSync("keystore/administrator-refresh.private", "utf-8"),
            },
        },
        dozvoliReqZaNevazeceTokene: true,
    },




};

export default Config;