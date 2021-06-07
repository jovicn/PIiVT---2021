import Ajv from "ajv";

interface IAddTermin {

    vreme: string;
    isActive: "aktivan" | "istekao" | "otkazan";
    bazenId: number;
}

const ajv = new Ajv();

const IAddTerminValidator = ajv.compile({
    type: "object",
    properties: {
        vreme:{
            type: "string",
            pattern:"^[0-9]{4}\-[0-9]{2}\-[0-9]{2} [0-9]{2}\:[0-9]{2}\:[0-9]{2}$",
        },
        isActive:{
            type: "string",
            pattern: "^(aktivan|istekao|otkazan)$",
        },
        bazenId:{
            type: "integer",
            minimum: 1,
        },
        
    },

    required: [
        "vreme",
        "bazenId",
    ],

    additionalProperties: false,

});

export {IAddTermin};
export {IAddTerminValidator};