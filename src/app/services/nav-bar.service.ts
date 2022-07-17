import { Injectable } from '@angular/core';
import { BearerTokenService } from './bearer-token.service';

@Injectable()
export class NavBarService {
  isLogged: boolean;

  constructor(
      private tokenService: BearerTokenService
  ) {
    this.isLogged = false;
  }

  hide() {
    this.isLogged = false;
  }

  show() {
    this.isLogged = true;
  }

  isLoggedIn(): boolean {
    return this.tokenService.getToken() != null;
  }

  getUserNameFromToken(): string {
    return this.tokenService.getUserNameFromToken();
  }

  logOut(): void {
    this.tokenService.logOut();
  }

}
