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
                'Authorization': 'Bearer NO-TOKEN',
            },
        }).then(res => responseHandler)
        .catch(err => {
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