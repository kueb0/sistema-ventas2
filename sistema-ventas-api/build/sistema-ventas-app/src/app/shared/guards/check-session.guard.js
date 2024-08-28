"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSessionGuard = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const rxjs_1 = require("rxjs");
const auth_service_1 = require("../../pages/auth/services/auth.service");
const checkSessionGuard = (route, state) => {
    const authSvs = (0, core_1.inject)(auth_service_1.AuthService);
    return authSvs.token$.pipe((0, rxjs_1.take)(1), (0, rxjs_1.map)(token => {
        if (token)
            return true;
        //redirect a login
        (0, core_1.inject)(router_1.Router).createUrlTree(['/login']);
        return false;
    }));
};
exports.checkSessionGuard = checkSessionGuard;
