"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const token_interceptor_1 = require("./token.interceptor");
describe('tokenInterceptor', () => {
    const interceptor = (req, next) => testing_1.TestBed.runInInjectionContext(() => (0, token_interceptor_1.tokenInterceptor)(req, next));
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
    });
    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });
});
