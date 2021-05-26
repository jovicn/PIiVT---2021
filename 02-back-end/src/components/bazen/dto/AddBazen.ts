import Ajv from "ajv";

interface IAddBazen {

    ime: string;
    adresa: string;
    grad: string;
    brojMesta: number;

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
    },

    required: [
        "ime",
        "adresa",
        "grad",
        "brojMesta",
    ],

    additionalProperties: false,

});

export {IAddBazen};
export {IAddBazenValidator};