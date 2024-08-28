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
exports.MaterialModule = void 0;
const core_1 = require("@angular/core");
const button_1 = require("@angular/material/button");
const icon_1 = require("@angular/material/icon");
const toolbar_1 = require("@angular/material/toolbar");
const sidenav_1 = require("@angular/material/sidenav");
const list_1 = require("@angular/material/list");
const card_1 = require("@angular/material/card");
const input_1 = require("@angular/material/input");
const snack_bar_1 = require("@angular/material/snack-bar");
const menu_1 = require("@angular/material/menu");
const table_1 = require("@angular/material/table");
const paginator_1 = require("@angular/material/paginator");
const dialog_1 = require("@angular/material/dialog");
const select_1 = require("@angular/material/select");
const myModules = [
    button_1.MatButtonModule,
    icon_1.MatIconModule,
    toolbar_1.MatToolbarModule,
    sidenav_1.MatSidenavModule,
    list_1.MatListModule,
    card_1.MatCardModule,
    input_1.MatInputModule,
    snack_bar_1.MatSnackBarModule,
    menu_1.MatMenuModule,
    table_1.MatTableModule,
    paginator_1.MatPaginatorModule,
    dialog_1.MatDialogModule,
    select_1.MatSelectModule
];
let MaterialModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [...myModules],
            exports: [...myModules]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MaterialModule = _classThis = class {
    };
    __setFunctionName(_classThis, "MaterialModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MaterialModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MaterialModule = _classThis;
})();
exports.MaterialModule = MaterialModule;
