import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import Config from "../config/dev";
import ITokenData from '../components/auth/dto/ITokenData.interface';

type pozicija = "korisnik" | "administrator";

interface TokenValidationInformation{
    isValid: boolean;
    data: any;
}

export default class AuthMiddleware{
    private static verifyAuthToken(req: Request, res: Response, next: NextFunction, podrzanePozicije: pozicija[]){

        if(Config.auth.dozvoliReqZaNevazeceTokene){
            return next();
        }

        if(typeof req.headers.authorization !== "string"){
            return res.status(401).send("Niste autorizovani");
        }

        const token: string = req.headers.authorization;
        const [tokenType, tokenString] = token.trim().split(" ");

        if(tokenType !== "Bearer"){
            return res.status(400).send("Pogresnan specificiran auth token");
        }

        if(typeof tokenString !== "string" || tokenString.length === 0 ){
            return res.status(400).send("Pogresna duzina");
        }

        const korisnikTokenValidation = this.validateTokenAsTokenByRole(tokenString, "korisnik");
        const administratorTokenValidation = this.validateTokenAsTokenByRole(tokenString, "administrator");

        let rezultat;

        if(korisnikTokenValidation.isValid === false && administratorTokenValidation.isValid === false){
            return res.status(500).send("Greska: " + korisnikTokenValidation + " " + administratorTokenValidation);
        }

        if (korisnikTokenValidation.isValid) {
            rezultat = korisnikTokenValidation.data;
        } else {
            rezultat = administratorTokenValidation.data;
        }


        if(typeof rezultat !== "object"){
            return res.status(400).send("Los token");
        }

        const data: ITokenData = rezultat as ITokenData;

        if(!podrzanePozicije.includes(data.role)){
            return res.status(403).send("Zabranjen pristup");
        }

        req.authorized = data;

        next();
    }

    private static validateTokenAsTokenByRole(tokenString: string, role: pozicija): TokenValidationInformation {
        try {
            const result = jwt.verify(tokenString, Config.auth[role].auth.public);
            return {
                isValid: true,
                data: result,
            };
        } catch (e) {
            return {
                isValid: false,
                data: e?.message,
            };
        }
    }

    public static getVerifier(
        ... podrzanePozicije: pozicija[]
    ): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            this.verifyAuthToken(req, res, next, podrzanePozicije);
        };
    }


}