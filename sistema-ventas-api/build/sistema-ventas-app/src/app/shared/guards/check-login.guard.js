"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoginGuard = void 0;
const auth_service_1 = require("../../pages/auth/services/auth.service");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const checkLoginGuard = (route, state) => {
    const authSvc = (0, core_1.inject)(auth_service_1.AuthService);
    return authSvc.token$.pipe((0, rxjs_1.take)(1), (0, rxjs_1.map)(token => !token ? true : false));
};
exports.checkLoginGuard = checkLoginGuard;
