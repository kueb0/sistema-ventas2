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
exports.UsuarioDialogComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const rxjs_1 = require("rxjs");
var Action;
(function (Action) {
    Action["EDIT"] = "edit";
    Action["NEW"] = "new";
})(Action || (Action = {}));
let UsuarioDialogComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-usuario-dialog',
            templateUrl: './usuario-dialog.component.html',
            styleUrls: ['./usuario-dialog.component.scss']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UsuarioDialogComponent = _classThis = class {
        constructor(data, dialogRef, fb, baseForm, usuarioSvc) {
            this.data = data;
            this.dialogRef = dialogRef;
            this.fb = fb;
            this.baseForm = baseForm;
            this.usuarioSvc = usuarioSvc;
            this.destroy$ = new rxjs_1.Subject();
            this.titleButton = "Guardar";
            this.actionTODO = Action.NEW;
            this.roles = [];
            this.userForm = this.fb.group({
                cveUsuario: [''],
                nombre: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
                apellidos: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
                username: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
                cveRol: ['', [forms_1.Validators.required]],
                password: ['', [forms_1.Validators.required]],
                confirmPassword: ['', [forms_1.Validators.required]]
            }, {
                validator: this.checkPasswords
            });
        }
        ngOnInit() {
            this.usuarioSvc.listarRoles().pipe((0, rxjs_1.takeUntil)(this.destroy$)).subscribe((roles) => {
                this.roles = roles;
                this.pathData();
            });
        }
        pathData() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            if (this.data.user.cveUsuario) {
                this.userForm.patchValue({
                    cveUsuario: (_a = this.data) === null || _a === void 0 ? void 0 : _a.user.cveUsuario,
                    nombre: (_b = this.data) === null || _b === void 0 ? void 0 : _b.user.nombre,
                    apellidos: (_c = this.data) === null || _c === void 0 ? void 0 : _c.user.apellidos,
                    username: (_d = this.data) === null || _d === void 0 ? void 0 : _d.user.username,
                    cveRol: (_e = this.data) === null || _e === void 0 ? void 0 : _e.user.cveRol,
                });
                (_f = this.userForm.get("username")) === null || _f === void 0 ? void 0 : _f.disable();
                // Eliminar las validaciones password, confirmPassword
                (_g = this.userForm.get("password")) === null || _g === void 0 ? void 0 : _g.setValidators(null);
                (_h = this.userForm.get("password")) === null || _h === void 0 ? void 0 : _h.setErrors(null);
                (_j = this.userForm.get("confirmPassword")) === null || _j === void 0 ? void 0 : _j.setValidators(null);
                (_k = this.userForm.get("confirmPassword")) === null || _k === void 0 ? void 0 : _k.setErrors(null);
                this.userForm.updateValueAndValidity();
                // Actualizar
                this.titleButton = "Actualizar";
                this.actionTODO = Action.EDIT;
            }
            else {
                // Insert
                this.titleButton = "Guardar";
                this.actionTODO = Action.NEW;
            }
        }
        onSave() {
            if (this.userForm.invalid)
                return;
            var formValue = this.userForm.getRawValue();
            if (this.actionTODO == Action.NEW) {
                // Insert
                var newUser = {
                    nombre: formValue.nombre,
                    apellidos: formValue.apellidos,
                    username: formValue.username,
                    password: formValue.password,
                    cveRol: parseInt(formValue.cveRol)
                };
                this.usuarioSvc.insertarUsuario(newUser)
                    .pipe((0, rxjs_1.takeUntil)(this.destroy$)).subscribe((data) => {
                    this.dialogRef.close(data);
                });
            }
            else {
                // Actualización
                var updateUser = {
                    cveUsuario: parseInt(formValue.cveUsuario),
                    nombre: formValue.nombre,
                    apellidos: formValue.apellidos,
                    cveRol: parseInt(formValue.cveRol)
                };
                this.usuarioSvc.actualizarUsuario(updateUser)
                    .pipe((0, rxjs_1.takeUntil)(this.destroy$)).subscribe((data) => {
                    this.dialogRef.close(data);
                });
            }
        }
        onClear() {
            if (this.actionTODO === Action.NEW) {
                this.userForm.reset(); // Limpia todos los campos en modo nuevo
            }
            else {
                // En modo de edición, solo limpia los campos de nombre y apellidos
                this.userForm.patchValue({
                    nombre: '',
                    apellidos: ''
                });
            }
        }
        checkPasswords(group) {
            var _a, _b;
            let pass = (_a = group.get('password')) === null || _a === void 0 ? void 0 : _a.value;
            let confirmPass = (_b = group.get('confirmPassword')) === null || _b === void 0 ? void 0 : _b.value;
            return pass === confirmPass ? null : { notSame: true };
        }
        ngOnDestroy() {
            this.destroy$.next({});
            this.destroy$.complete();
        }
    };
    __setFunctionName(_classThis, "UsuarioDialogComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsuarioDialogComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsuarioDialogComponent = _classThis;
})();
exports.UsuarioDialogComponent = UsuarioDialogComponent;
