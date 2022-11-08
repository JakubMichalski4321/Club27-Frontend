import { Injectable } from '@angular/core';
import { BearerTokenService } from '../user/bearer-token.service';

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

}
