import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { DeptService } from '../comp/dept.service';

@Injectable({
  providedIn: 'root'
})
export class BearerTokenService {

  constructor(
    private deptService: DeptService,
  ) { }

  private STORAGE_TOKEN_NAME: string = 'klub27User';

  private token: string = null;

  getToken(): string {
    if (this.token) {
      return this.token;
    } else if (this.getTokenFromStorage()) {
      this.token = this.getTokenFromStorage();
      return this.token;
    };
  }

  saveToken(token: string) {
    this.token = token;
    this.saveTokenInStorage(
      { token: token, username: jwt_decode(token)['sub'] }
    );
  }

  logOut(): void {
    localStorage.removeItem(this.STORAGE_TOKEN_NAME);
  }

  isTokenAfterExpired(token: string): boolean {
    if (!token) {
      return true;
    } else if (new Date() > new Date(jwt_decode(this.getToken())['exp'] * 1000)) {
      return true;
    }
    return false;
  }

  getUserId(): string {
    let fromStorage = this.getTokenFromStorage();
    if (fromStorage && fromStorage.userId) {
      return fromStorage.userId;
    } else if (this.getUserNameFromToken()) {
      this.deptService.getUserIdByUserName(this.getUserNameFromToken()).subscribe(resp => {
        fromStorage.userId = resp.value;
        this.saveTokenInStorage(fromStorage);
        return resp.value;
      });
    }
  }

  getUserNameFromToken(): string {
    const token = this.getTokenFromStorage();
    if (token && token.username) {
      return token.username;
    }
    try {
      return jwt_decode(this.getToken())['sub'];
    } catch (Error) {
      return null;
    }
  }

  isLoggedIn(): boolean {
    console.log(this.token);
    return this.getToken() && !this.isTokenAfterExpired(this.getToken());
  }

  private getTokenFromStorage(): any {
    return localStorage.getItem(this.STORAGE_TOKEN_NAME);
  }

  private saveTokenInStorage(tokenString: any): void {
    localStorage.setItem(this.STORAGE_TOKEN_NAME, JSON.stringify(tokenString));
  }

}
