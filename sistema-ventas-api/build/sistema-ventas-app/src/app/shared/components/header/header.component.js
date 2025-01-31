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
exports.HeaderComponent = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let HeaderComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrl: './header.component.scss'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _toggleSidenav_decorators;
    let _toggleSidenav_initializers = [];
    let _toggleSidenav_extraInitializers = [];
    var HeaderComponent = _classThis = class {
        constructor(authSvc) {
            this.authSvc = authSvc;
            this.toggleSidenav = __runInitializers(this, _toggleSidenav_initializers, new core_1.EventEmitter);
            this.isLogged = (__runInitializers(this, _toggleSidenav_extraInitializers), false);
            this.data = {};
            this.destroy$ = new rxjs_1.Subject();
        }
        ngOnInit() {
            //Obtener la variable para indicar si tiene una sesión 
            this.authSvc.isLogged$.pipe((0, rxjs_1.takeUntil)(this.destroy$)).subscribe((isLogged) => {
                this.isLogged = isLogged;
                console.log("isLogged", this.isLogged);
            });
            //Obtener la información del usuario
            this.authSvc.tokenData$.pipe((0, rxjs_1.takeUntil)(this.destroy$)).subscribe((data) => {
                this.data = data;
                console.log("data", this.data);
            });
        }
        onToggleSidenav() {
            this.toggleSidenav.emit();
        }
        onLogout() {
            this.authSvc.logout();
        }
        ngOnDestroy() {
            this.destroy$.next({});
            this.destroy$.complete();
        }
    };
    __setFunctionName(_classThis, "HeaderComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _toggleSidenav_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _toggleSidenav_decorators, { kind: "field", name: "toggleSidenav", static: false, private: false, access: { has: obj => "toggleSidenav" in obj, get: obj => obj.toggleSidenav, set: (obj, value) => { obj.toggleSidenav = value; } }, metadata: _metadata }, _toggleSidenav_initializers, _toggleSidenav_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeaderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeaderComponent = _classThis;
})();
exports.HeaderComponent = HeaderComponent;
