"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenInterceptor = void 0;
const core_1 = require("@angular/core");
const auth_service_1 = require("../../pages/auth/services/auth.service");
const tokenInterceptor = (req, next) => {
    if (req.headers.get("requireToken")) {
        const authSvc = (0, core_1.inject)(auth_service_1.AuthService);
        const token = authSvc.tokenValue;
        if (token) {
            const authReq = req.clone({
                setHeaders: {
                    auth: `${token}`
                }
            });
            return next(authReq);
        }
    }
    return next(req);
};
exports.tokenInterceptor = tokenInterceptor;
