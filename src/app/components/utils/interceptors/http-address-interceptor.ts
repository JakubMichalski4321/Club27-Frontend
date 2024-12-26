import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { BearerTokenService } from '../../../services/user/bearer-token.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpAddressInterceptor implements HttpInterceptor {

  private baseUrl = 'http://145.239.92.211:8090/';
  //private baseUrl: string = 'http://localhost:8090/';
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
    private route: Router,
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
      if(this.bearerService.isTokenAfterExpired(this.bearerService.getToken())) {
        this.route.navigate(['login']);
      }
      req = req.clone({
          url: this.baseUrl + relativeUrl,
          headers: req.headers
            .append("Access-Control-Allow-Origin", "*")
            .append('Authorization', 'Bearer ' + this.bearerService.getToken())
      });
      return next.handle(req).pipe(catchError(err => this.handleAuthError(err)));
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
      if (err.status === 401 || err.status === 403) {
          this.bearerService.logOut();
          this.route.navigate(['login']);
          return of(err.message);
      }
      return throwError(err);
  }

    private checkIfStringStartsWith(str: string, substrs: string[]) {
      return substrs.some(substr => str.startsWith(substr));
    }

}
