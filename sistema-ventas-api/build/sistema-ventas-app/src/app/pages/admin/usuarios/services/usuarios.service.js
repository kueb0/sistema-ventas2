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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const environment_development_1 = require("../../../../../environments/environment.development");
let UsuariosService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UsuariosService = _classThis = class {
        constructor(snackBar, http) {
            this.snackBar = snackBar;
            this.http = http;
        }
        listarUsuarios() {
            return this.http.get(`${environment_development_1.environment.API_URL}/usuarios`, { headers: { "requireToken": "true" } }).pipe((0, rxjs_1.catchError)((error) => this.handlerError(error)));
        }
        listarRoles() {
            return this.http.get(`${environment_development_1.environment.API_URL}/general/roles`, { headers: { "requireToken": "true" } }).pipe((0, rxjs_1.catchError)((error) => this.handlerError(error)));
        }
        insertarUsuario(user) {
            return this.http.post(`${environment_development_1.environment.API_URL}/usuarios`, user, { headers: { "requireToken": "true" } }).pipe((0, rxjs_1.catchError)((error) => this.handlerError(error)));
        }
        actualizarUsuario(user) {
            return this.http.put(`${environment_development_1.environment.API_URL}/usuarios/`, user, { headers: { "requireToken": "true" } }).pipe((0, rxjs_1.catchError)((error) => this.handlerError(error)));
        }
        eliminarUsuario(cveUsuario) {
            return this.http.delete(`${environment_development_1.environment.API_URL}/usuarios/${cveUsuario}`, { headers: { "requireToken": "true" } }).pipe((0, rxjs_1.catchError)((error) => this.handlerError(error)));
        }
        handlerError(error) {
            console.log(error);
            var message = "Ocurrió un error";
            if (error.error) {
                if (error.error.message)
                    message = error.error.message;
                else
                    message = "Ocurrió un error";
            }
            this.snackBar.open(message, '', {
                duration: 3000
            });
            return (0, rxjs_1.throwError)(() => new Error(message));
        }
    };
    __setFunctionName(_classThis, "UsuariosService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsuariosService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsuariosService = _classThis;
})();
exports.UsuariosService = UsuariosService;
