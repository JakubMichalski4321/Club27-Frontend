import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpAddressInterceptor implements HttpInterceptor {

    private baseUrl = 'http://localhost:8080/';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const relativeUrl = req.url;
        req = req.clone({
            url: this.baseUrl + relativeUrl
        });
        return next.handle(req);
    }

}
