import Ajv from "ajv";

interface IAddTermin {

    zakazanAt: string;
    status: "aktivan" | "otkazan";
    bazenId: number;
}

const ajv = new Ajv();

const IAddTerminValidator = ajv.compile({
    type: "object",
    properties: {
        zakazanAt:{
            type: "string",
            pattern:"^[0-9]{4}\-[0-9]{2}\-[0-9]{2} [0-9]{2}\:[0-9]{2}\:[0-9]{2}$",
        },
        status:{
            type: "string",
            pattern: "^(aktivan|otkazan)$",
        },
        bazenId:{
            type: "integer",
            minimum: 1,
        },
        
    },

    required: [
        "zakazanAt",
        "bazenId",
    ],

    additionalProperties: false,

});

export {IAddTermin};
export {IAddTerminValidator};