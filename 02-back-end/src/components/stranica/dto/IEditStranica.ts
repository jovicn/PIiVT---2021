import Ajv from "ajv";

interface IEditStranica {

    naziv: string;
    tekst: string;
}

const ajv = new Ajv();

const IEditStranicaValidator = ajv.compile({
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

export { IEditStranica};
export { IEditStranicaValidator};