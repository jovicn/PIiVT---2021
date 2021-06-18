import Ajv from "ajv";

interface IEditTermin {
    zakazanAt: string;
    status: "aktivan" | "otkazan";
    bazenId: number;

}

const ajv = new Ajv();

const IEditTerminValidator = ajv.compile({
    type: "object",
    properties: {
        zakazanAt:{
            type: "string",
            pattern:"^[0-9]{4}\-[0-9]{2}\-[0-9]{2} [0-9]{2}\:[0-9]{2}\:[0-9]{2}$",
        },
        status:{
            type: "string",
            pattern: "^(aktivan|otkazan)$"
        },
        bazenId:{
            type: "integer",
            minimum: 1,
        },
    },

    required: [
        "zakazanAt",
        "status",
    ],

    additionalProperties: false,

});

export {IEditTermin};
export {IEditTerminValidator};