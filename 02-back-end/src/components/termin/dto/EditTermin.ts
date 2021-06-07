import Ajv from "ajv";

interface IEditTermin {
    vreme: string;
    isActive: "aktivan" | "istekao" | "otkazan";
    bazenId: number;

}

const ajv = new Ajv();

const IEditTerminValidator = ajv.compile({
    type: "object",
    properties: {
        vreme:{
            type: "string",
            pattern:"^[0-9]{4}\-[0-9]{2}\-[0-9]{2} [0-9]{2}\:[0-9]{2}\:[0-9]{2}$",
        },
        isActive:{
            type: "string",
            pattern: "^(aktivan|istekao|otkazan)$"
        },
        bazenId:{
            type: "integer",
            minimum: 1,
        },
    },

    required: [
        "vreme",
        "isActive",
    ],

    additionalProperties: false,

});

export {IEditTermin};
export {IEditTerminValidator};