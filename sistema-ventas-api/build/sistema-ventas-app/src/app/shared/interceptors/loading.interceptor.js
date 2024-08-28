"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadingInterceptor = void 0;
const core_1 = require("@angular/core");
const ngx_spinner_1 = require("ngx-spinner");
const rxjs_1 = require("rxjs");
var countRequest = 0;
function loadingInterceptor(req, next) {
    console.log("Loading::Interceptor");
    countRequest++;
    const spinner = (0, core_1.inject)(ngx_spinner_1.NgxSpinnerService);
    spinner.show();
    return next(req).pipe((0, rxjs_1.finalize)(() => {
        countRequest--;
        if (!countRequest) {
            spinner.hide();
        }
    }));
}
exports.loadingInterceptor = loadingInterceptor;
// export class LoadingInterceptor implements HttpInterceptor {
//   private countRequest=0;
//   constructor(private spinner: NgxSpinnerService() { }
//   intercept(req: HttpRequest <any>, next: HttpHandler): Observable<HttpEvent<any>>{
//     console.log("Loading::Interceptor");
//     this.spinner.show();
//     this.countRequest++;
//     return next.hadle(req).pipe(finalize(() => {
//       this.countRequest--;
//       if (!this.countRequest) {
//         this.spinner.hide();
//       }
//     }));
//   }
// }
