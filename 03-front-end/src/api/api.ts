import axios, { AxiosResponse } from 'axios';
import { AppConfiguration } from '../../config/app.config';
type ApiMethod = 'get' | 'post' | 'put' | 'delete';
type ApiRole = 'korisnik' | 'administrator'; 
type ApiResponseStatus = 'ok' | 'error' | 'login';

interface ApiResponse{
    status: ApiResponseStatus,
    data: any,

}

export default function api(
    method: ApiMethod,
    path: string,
    role: ApiRole = 'korisnik',
    body: any | undefined = undefined,
     
): Promise<ApiResponse|undefined> {
    return new Promise<ApiResponse|undefined>(resolve => {
        axios({
            method: method,
            baseURL: AppConfiguration.API_URL,
            url: path,
            data: body ? JSON.stringify(body) : '',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getAuthToken(role),
            },
        }).then(res => responseHandler)
        .catch(async err => {

            if((""+err?.response).includes("Los token")){
                const newToken: string | null = await refreshToken(role);

                if(newToken === null){
                    return resolve({
                        status: 'login',
                        data: null,
                    })
                }

                saveAuthToken(role, newToken);

            }

            if(err?.response?.status === 401){
                return resolve({
                    status: 'login',
                    data: null,
                })
            }

            if(err?.response?.status === 403) {
                return resolve({
                    status: 'login',
                    data: 'Pogresna uloga korisnika'
                }); 
            }

            resolve({
                status: 'error',
                data: '' +err?.response,
            })
        })
    });

}

function responseHandler(res: AxiosResponse<any>, resolve: (data: ApiResponse) => void) {
    if (res?.status < 200 || res?.status >= 300) {
        return resolve({
            status: 'error',
            data: '' + res,
        });
    }

    resolve({
        status: 'ok',
        data: res.data,
    });
}

function getAuthToken(role: ApiRole): string {
    return localStorage.getItem(role + "-auth-token") ?? '';
}

function getRefreshToken(role: ApiRole): string {
    return localStorage.getItem(role + "-refresh-token") ?? '';
}

function saveAuthToken(role: ApiRole, token: string){
    localStorage.setItem(role + "-auth-token", token);
}

function saveRefreshToken(role: ApiRole, token: string){
    localStorage.setItem(role + "-refresh-token", token);
}

export { saveAuthToken, saveRefreshToken };

export function saveIdentity(role: ApiRole, identity: string){
   localStorage.setItem(role + "-identity", identity);
}

export function getIdentity(role: ApiRole): string{
   return localStorage.getItem(role + "-identity") ?? '';
 }

 function refreshToken(role: ApiRole): Promise<string|null> {
    return new Promise<string|null>(resolve => {
        axios({
            method: "post",
            baseURL: AppConfiguration.API_URL,
            url: "/auth/" + role + "/refresh",
            data: JSON.stringify({
                refreshToken: getRefreshToken(role),
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => refreshTokenResponseHandler(res, resolve))
        .catch(() => {
            resolve(null);
        });
    });
}

function refreshTokenResponseHandler(res: AxiosResponse<any>, resolve: (data: string|null) => void) {
    if (res.status !== 200) {
        return resolve(null);
    }

    resolve(res.data?.authToken);
}
