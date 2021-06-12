import { Algorithm } from "jsonwebtoken";

interface TokenKeyOptions{
    private: string;
    public: string;
    trajanje: number;
}
interface TokenOptions{
    auth:TokenKeyOptions,
    refresh: TokenKeyOptions,
    izdavac: string;
    algorithm: Algorithm;
}
interface IConfig{

    server: {
        port: number;
     },
     
     database: {
         host: string;
         port: number;
         user: string;
         password: string;
         database: string;
         charset: string;
         timezone: string;
     },

     auth: {
         korisnik: TokenOptions,
         administrator: TokenOptions,

         },
     

};


export default IConfig;