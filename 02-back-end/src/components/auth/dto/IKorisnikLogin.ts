import Ajv from "ajv";

interface IKorisnikLogin {
    email: string;
    password: string;
}

const ajv = new Ajv();

const IKorisnikLoginValidator = ajv.compile({
    type: "object",
    properties: {
        email:{
            type: "string",
            minLength: 8,
            maxLength: 255,
        },
        password:{
            type: "string",
            minLength: 5,
            maxLength: 255,
        },
    },

    required: [
        "email",
        "password"
    ],

    additionalProperties: false,

});

export {IKorisnikLogin};
export {IKorisnikLoginValidator};