import BaseController from "../../common/BaseController";
import { Request, Response } from "express";
import { IKorisnikLogin, IKorisnikLoginValidator } from "./dto/IKorisnikLogin";
import * as bcrypt from "bcrypt";
import { resolve } from 'path/posix';
import ITokenData from './dto/ITokenData.interface';
import * as jwt from "jsonwebtoken";
import Config from '../../config/dev';
import { IAdministratorLogin, IAdministratorLoginValidator } from "./dto/IAdministratorLogin";
import {IRefreshToken, IRefreshTokenValidator } from "./dto/IRefreshToken";
import { Console } from "console";



export default class AuthController extends BaseController{

    public async korisnikLogin(req: Request, res: Response){
        if(!IKorisnikLoginValidator(req.body)){
            return res.status(400).send(IKorisnikLoginValidator);
        }

        const data = req.body as IKorisnikLogin;

        const korisnik = await this.services.korisnikService.getByEmail(data.email);
        if(korisnik === null){
            return res.sendStatus(404);
        }
     
        if(!bcrypt.compareSync(data.password, korisnik.passwordHash)) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return res.status(403).send("Pogresna lozinka.");
        }

        const authTokenData: ITokenData = {
            id: korisnik.korisnikId,
            identitet: korisnik.email,
            role: "korisnik",
        };

        const refreshTokenData: ITokenData = {
            id: korisnik.korisnikId,
            identitet: korisnik.email,
            role: "korisnik",
        };

        const authToken = jwt.sign(
            authTokenData,
            Config.auth.korisnik.auth.private,
            {
                algorithm: Config.auth.korisnik.algorithm,
                issuer: Config.auth.korisnik.izdavac,
                expiresIn: Config.auth.korisnik.auth.trajanje,
            },
        );

        const refreshToken = jwt.sign(
            refreshTokenData,
            Config.auth.korisnik.refresh.private,
            {
                algorithm: Config.auth.korisnik.algorithm,
                issuer: Config.auth.korisnik.izdavac,
                expiresIn: Config.auth.korisnik.refresh.trajanje,
            },
        );
        
        res.send({
            authToken: authToken,
            refreshToken: refreshToken,
        });

    }

    public async administratorLogin(req: Request, res: Response){
        if(!IAdministratorLoginValidator(req.body)){
            return res.status(400).send(IAdministratorLoginValidator);
        }

        const data = req.body as IAdministratorLogin;

        const administrator = await this.services.administratorService.getByUsername(data.username);
        if(administrator === null){
            return res.sendStatus(404);
        }

        if(!administrator.isActive){
            res.status(403).send("Nalog je suspendovan");
            return;
        }
     
        if(!bcrypt.compareSync(data.password, administrator.passwordHash)) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return res.status(403).send("Pogresna lozinka.");
        }

        const authTokenData: ITokenData = {
            id: administrator.administratorId,
            identitet: administrator.username,
            role: "administrator",
        };

        const refreshTokenData: ITokenData = {
            id: administrator.administratorId,
            identitet: administrator.username,
            role: "administrator",
        };

        const authToken = jwt.sign(
            authTokenData,
            Config.auth.administrator.auth.private,
            {
                algorithm: Config.auth.administrator.algorithm,
                issuer: Config.auth.administrator.izdavac,
                expiresIn: Config.auth.administrator.auth.trajanje,
            },
        );

        const refreshToken = jwt.sign(
            refreshTokenData,
            Config.auth.administrator.refresh.private,
            {
                algorithm: Config.auth.administrator.algorithm,
                issuer: Config.auth.administrator.izdavac,
                expiresIn: Config.auth.administrator.refresh.trajanje,
            },
        );
        
        res.send({
            authToken: authToken,
            refreshToken: refreshToken,
        });

    }

    async korisnikRefresh(req: Request, res: Response){
        this.refreshTokenByRole("korisnik")(req,res);
    }

    async administratorRefresh(req: Request, res: Response){
        this.refreshTokenByRole("administrator")(req,res);
    }

    private refreshTokenByRole(role: "korisnik" | "administrator"): (req: Request, res: Response) => void {
        return (req: Request, res: Response) => {
            if (!IRefreshTokenValidator(req.body)) {
                return res.status(400).send(IRefreshTokenValidator.errors);
            }
    
            const tokenString: string = (req.body as IRefreshToken).refreshToken;
            
            try {
              
                const existingData = jwt.verify(tokenString, Config.auth[role].auth.public) as ITokenData;
                
                const newTokenData: ITokenData = {
                    id: existingData.id,
                    identitet: existingData.identitet,
                    role: existingData.role,
                }
                console.log("novi: " + newTokenData);
                const authToken = jwt.sign(
                    newTokenData,
                    Config.auth[role].auth.private,
                    {
                        algorithm: Config.auth[role].algorithm,
                        issuer: Config.auth[role].izdavac,
                        expiresIn: Config.auth[role].auth.trajanje,
                    },
                );
    
                res.send({
                    authToken: authToken,
                    refreshToken: null,
                });
            } catch (e) {
                //console.log(e);
                return res.status(400).send("Invalid refresh token: " + e?.message);
            }
        }
    }


}
