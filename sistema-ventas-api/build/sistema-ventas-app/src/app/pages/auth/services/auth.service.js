"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const environment_development_1 = require("../../../../environments/environment.development");
const angular_jwt_1 = require("@auth0/angular-jwt");
const common_1 = require("@angular/common");
const helper = new angular_jwt_1.JwtHelperService();
let AuthService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = _classThis = class {
        constructor(router, http, snackBar, platformId) {
            this.router = router;
            this.http = http;
            this.snackBar = snackBar;
            this.platformId = platformId;
            this.token = new rxjs_1.BehaviorSubject("");
            this.tokenData = new rxjs_1.BehaviorSubject({});
            this.isLogged = new rxjs_1.BehaviorSubject(false);
            this.checkToken();
        }
        get token$() {
            return this.token.asObservable();
        }
        get tokenValue() {
            return this.token.getValue();
        }
        get tokenData$() {
            return this.tokenData.asObservable();
        }
        get isLogged$() {
            return this.isLogged.asObservable();
        }
        login(logindata) {
            return this.http.post(`${environment_development_1.environment.API_URL}/auth`, logindata)
                .pipe((0, rxjs_1.map)((data) => {
                if (data.token) {
                    this.saveLocalStorage(data.token);
                    this.token.next(data.token);
                    this.isLogged.next(true);
                    this.checkToken();
                    this.router.navigate(['/home']);
                }
                return data;
            }), (0, rxjs_1.catchError)((error) => this.handlerError(error)));
        }
        saveLocalStorage(token) {
            localStorage.setItem("jwt", token);
        }
        logout() {
            if ((0, common_1.isPlatformBrowser)(this.platformId)) {
                localStorage.removeItem("jwt");
            }
            this.token.next("");
            this.tokenData.next(null);
            this.isLogged.next(false);
            this.router.navigate(['/home']);
        }
        checkToken() {
            var token = "";
            if ((0, common_1.isPlatformBrowser)(this.platformId)) {
                token = localStorage.getItem("jwt");
            }
            if (token) {
                const isExpired = helper.isTokenExpired(token);
                if (isExpired)
                    this.logout();
                else {
                    this.token.next(token);
                    //Renovamos los datos del usuario
                    const _a = helper.decodeToken(token), { iat, exp } = _a, data = __rest(_a, ["iat", "exp"]);
                    this.tokenData.next(data);
                    this.isLogged.next(true);
                }
            }
            else {
                this.logout();
            }
        }
        handlerError(error) {
            var message = "";
            if (error.error) {
                if (error.error.message)
                    message = error.error.message;
                else
                    message = "Ocurrió un error";
            }
            this.snackBar.open(message, '', {
                duration: 3000
            });
            return (0, rxjs_1.throwError)(() => Error(message));
        }
    };
    __setFunctionName(_classThis, "AuthService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
})();
exports.AuthService = AuthService;
