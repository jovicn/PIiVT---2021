import Ajv from "ajv";

interface IEditKorisnik {

    ime: string;
    prezime: string;
    email: string;
    telefon: string;
    password: string;
    isActive: boolean;
}

const ajv = new Ajv();

const IEditKorisnikValidator = ajv.compile({
    type: "object",
    properties: {
        ime:{
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        prezime:{
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        email:{
            type: "string",
            minLength: 8,
            maxLength: 255,
        },
        telefon:{
            type: "string",
            minLength: 5,
            maxLength: 24,
        },
        password:{
            type: "string",
            minLength: 5,
            maxLength: 255,
        },
        isActive: {
            type: "boolean",
        },
    },

    required: [
        "ime",
        "prezime",
        "email",
        "telefon",
        "password",
        "isActive",
    ],

    additionalProperties: false,

});

export {IEditKorisnik};
export {IEditKorisnikValidator};