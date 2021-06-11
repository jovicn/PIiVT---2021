import Ajv from "ajv";

interface IAddStranica {

    naziv: string;
    tekst: string;
}

const ajv = new Ajv();

const IAddStranicaValidator = ajv.compile({
    type: "object",
    properties: {
        naziv:{
            type: "string",
            minLength: 5,
            maxLength: 255,
        },
        tekst:{
            type: "string",
            minLength: 5,
        },
    },

    required: [
        "naziv",
        "tekst",
    ],

    additionalProperties: false,

});

export {IAddStranica};
export {IAddStranicaValidator};