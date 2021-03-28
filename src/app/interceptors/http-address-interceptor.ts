import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpAddressInterceptor implements HttpInterceptor {

    private baseUrl = "";

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const relativeUrl = req.url;
        req = req.clone({
            url: this.baseUrl + relativeUrl
        });
        return next.handle(req);
    }

}
