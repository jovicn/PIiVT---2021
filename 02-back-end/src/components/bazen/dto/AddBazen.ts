import Ajv from "ajv";

interface IAddBazen {

    ime: string;
    adresa: string;
    grad: string;
    brojMesta: number;
    telefon: string;

}

const ajv = new Ajv();

const IAddBazenValidator = ajv.compile({
    type: "object",
    properties: {
        ime:{
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        adresa:{
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        grad:{
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        brojMesta:{
            type: "integer",
            minimum: 5,
            maximum: 700,
        },
        telefon:{
            type: "string",
            pattern:"^[0-9]{9,10}$"
        },
    },

    required: [
        "ime",
        "adresa",
        "grad",
        "brojMesta",
        "telefon",
    ],

    additionalProperties: false,

});

export {IAddBazen};
export {IAddBazenValidator};