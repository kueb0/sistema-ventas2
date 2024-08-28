"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const loading_interceptor_1 = require("./loading.interceptor");
describe('loadingInterceptor', () => {
    const interceptor = (req, next) => testing_1.TestBed.runInInjectionContext(() => (0, loading_interceptor_1.loadingInterceptor)(req, next));
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
    });
    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });
});
