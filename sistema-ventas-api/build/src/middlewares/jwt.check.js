"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtCheck = void 0;
const utils_1 = require("../utils/utils");
const jwtCheck = (req, res, next) => {
    try {
        const token = req.headers["auth"];
        //TODO: Obtener la ifnormación del token
        let payload = utils_1.utils.getPayload(token);
        //refresh token
        const newToken = utils_1.utils.generateJWT(payload);
        res.setHeader("auth", newToken);
        next();
    }
    catch (error) {
        return res.status(401).send("Not Authorized");
    }
};
exports.jwtCheck = jwtCheck;
