"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (req, res, next) => {
    console.log("Init Middleware :: validator.check");
    //Se obtienen los errores a partir del request original de la petición.
    const errors = (0, express_validator_1.validationResult)(req);
    //Si no existen errores la petición continua.
    if (errors.isEmpty())
        return next();
    //Se devuelven los errores con un estado de petición 400 (estatus genérico porque puede ser del 400 al 499)
    return res.status(400).json(errors.array());
};
exports.validate = validate;
