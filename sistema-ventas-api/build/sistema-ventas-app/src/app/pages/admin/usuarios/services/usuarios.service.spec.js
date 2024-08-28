"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const usuarios_service_1 = require("./usuarios.service");
describe('UsuariosService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(usuarios_service_1.UsuariosService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
