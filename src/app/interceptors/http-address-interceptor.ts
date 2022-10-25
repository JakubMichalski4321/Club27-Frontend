import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BearerTokenService } from '../services/bearer-token.service';

@Injectable()
export class HttpAddressInterceptor implements HttpInterceptor {

  //private baseUrl = 'http://145.239.92.211:8090/';
  private baseUrl: string = 'http://localhost:8090/';
  private FREE_BASED_URLS: string[] = [
    'user/login',
    'user/register-user',
    'pajacyzm',
    'soundboard',
    'meme',
    'jugo',
  ]

  constructor(
    private bearerService: BearerTokenService,
  ) {

  }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const relativeUrl = req.url;
      if(this.checkIfStringStartsWith(req.url, this.FREE_BASED_URLS)) {
          req = req.clone({
            url: this.baseUrl + relativeUrl
        });
        return next.handle(req);
      }
      req = req.clone({
          url: this.baseUrl + relativeUrl,
          headers: req.headers
            .append("Access-Control-Allow-Origin", "*")
            //.append('Content-Type', 'application/json')
            // .append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
            // .append("Access-Control-Max-Age", "3600")
            // .append("Access-Control-Allow-Headers", "access-control-allow-origin, authorization, content-type, xsrf-token")
            // .append("Access-Control-Expose-Headers", "xsrf-token")
            .append('Authorization', 'Bearer ' + this.bearerService.getToken())
      });
      return next.handle(req);
    }

    private checkIfStringStartsWith(str: string, substrs: string[]) {
      return substrs.some(substr => str.startsWith(substr));
    }

}
