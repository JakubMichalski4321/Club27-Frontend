import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BearerTokenService } from '../services/bearer-token.service';

@Injectable()
export class HttpAddressInterceptor implements HttpInterceptor {

  //private baseUrl = 'http://145.239.92.211:8090/';
  private baseUrl = 'http://localhost:8090/';

  constructor(
    private bearerService: BearerTokenService,
  ) {

  }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const relativeUrl = req.url;
      if(req.url === "user/login" || req.url === "user/register-user") {
          req = req.clone({
            url: this.baseUrl + relativeUrl
        });
        return next.handle(req);
      }
      req = req.clone({
          url: this.baseUrl + relativeUrl,
          headers: req.headers.append('Authorization', 'Bearer ' + this.bearerService.getToken())
      });
      return next.handle(req);
    }

}
