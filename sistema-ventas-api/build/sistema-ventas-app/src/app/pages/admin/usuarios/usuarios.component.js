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
exports.UsuariosComponent = void 0;
const core_1 = require("@angular/core");
const paginator_1 = require("@angular/material/paginator");
const table_1 = require("@angular/material/table");
const usuario_dialog_component_1 = require("./components/usuario-dialog/usuario-dialog.component");
const rxjs_1 = require("rxjs");
let UsuariosComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-usuarios',
            templateUrl: './usuarios.component.html',
            styleUrl: './usuarios.component.scss'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _paginator_decorators;
    let _paginator_initializers = [];
    let _paginator_extraInitializers = [];
    var UsuariosComponent = _classThis = class {
        constructor(dialog, usuarioSvc) {
            this.dialog = dialog;
            this.usuarioSvc = usuarioSvc;
            this.destroy$ = new rxjs_1.Subject();
            this.dataSource = new table_1.MatTableDataSource();
            this.paginator = __runInitializers(this, _paginator_initializers, void 0);
            this.displayedColumns = (__runInitializers(this, _paginator_extraInitializers), ['nombre', 'apellidos', 'username', 'rol', 'acciones']);
        }
        // usuarios: Usuario[] = [
        //   {cveUsuario: 1, nombre: 'Sandra', apellidos: 'Alvarez', username: 'karisa'},
        //   {cveUsuario: 2, nombre: 'Karina', apellidos: 'Gonzalez', username: 'hola'}
        // ]
        ngOnInit() {
            this.listar();
        }
        listar() {
            this.usuarioSvc.listarUsuarios().pipe((0, rxjs_1.takeUntil)(this.destroy$)).subscribe((usuarios) => {
                this.dataSource.data = usuarios;
            });
        }
        ngAfterViewInit() {
            this.dataSource.paginator = this.paginator;
        }
        onOpenModal(user = {}) {
            const dialogRef = this.dialog.open(usuario_dialog_component_1.UsuarioDialogComponent, {
                maxWidth: '100%',
                width: '80%',
                data: {
                    user
                }
            });
            dialogRef.afterClosed()
                .pipe((0, rxjs_1.takeUntil)(this.destroy$))
                .subscribe(result => {
                if (result) {
                    this.listar();
                }
            });
        }
        onDelete(cveUsuario) {
            this.usuarioSvc.eliminarUsuario(cveUsuario).pipe((0, rxjs_1.takeUntil)(this.destroy$))
                .subscribe((result) => {
                this.listar();
            });
        }
        ngOnDestroy() {
            this.destroy$.next({});
            this.destroy$.complete();
        }
    };
    __setFunctionName(_classThis, "UsuariosComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _paginator_decorators = [(0, core_1.ViewChild)(paginator_1.MatPaginator)];
        __esDecorate(null, null, _paginator_decorators, { kind: "field", name: "paginator", static: false, private: false, access: { has: obj => "paginator" in obj, get: obj => obj.paginator, set: (obj, value) => { obj.paginator = value; } }, metadata: _metadata }, _paginator_initializers, _paginator_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsuariosComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsuariosComponent = _classThis;
})();
exports.UsuariosComponent = UsuariosComponent;
