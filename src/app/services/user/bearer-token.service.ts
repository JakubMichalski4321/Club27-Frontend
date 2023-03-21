import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { from } from 'rxjs';
import { DeptService } from '../comp/dept.service';

@Injectable({
  providedIn: 'root'
})
export class BearerTokenService {

  constructor(
    private deptService: DeptService,
  ) { }

  private STORAGE_TOKEN: string = 'klub27User';
  private STORAGE_USER_ID: string = 'klub27UserId';
  private STORAGE_USERNAME: string = 'klub27UserUsername';

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
    this.saveTokenInStorage(token);
    this.saveUsernameInStroage(jwt_decode(token)['sub']);
    this.deptService.getUserIdByUserName(jwt_decode(token)['sub']).subscribe(resp => {
      this.saveUserIdInStorage(resp.value);
    })
  }

  logOut(): void {
    localStorage.removeItem(this.STORAGE_TOKEN);
    localStorage.removeItem(this.STORAGE_USER_ID);
    localStorage.removeItem(this.STORAGE_USERNAME);
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
    let userIdFromStorage = this.getUserIdFromStorage();
    if (userIdFromStorage) {
      return userIdFromStorage;
    } else if (this.getUsernameFromStorage()) {
      this.deptService.getUserIdByUserName(this.getUsernameFromStorage()).subscribe(resp => {
        userIdFromStorage = resp.value;
        this.saveUserIdInStorage(userIdFromStorage);
        return resp.value;
      });
    }
  }

  getUsername(): string {
    return this.getUsernameFromStorage();
  }

  isLoggedIn(): boolean {
    return this.getToken() && !this.isTokenAfterExpired(this.getToken());
  }

  private getTokenFromStorage(): string {
    return localStorage.getItem(this.STORAGE_TOKEN);
  }

  private getUserIdFromStorage(): string {
    return localStorage.getItem(this.STORAGE_USER_ID);
  }

  private getUsernameFromStorage(): string {
    return localStorage.getItem(this.STORAGE_USERNAME);
  }

  private saveTokenInStorage(tokenString: any): void {
    localStorage.setItem(this.STORAGE_TOKEN, tokenString);
  }

  private saveUserIdInStorage(userId: any): void {
    localStorage.setItem(this.STORAGE_USER_ID, userId);
  }

  private saveUsernameInStroage(username: string): void{
    localStorage.setItem(this.STORAGE_USERNAME, username);
  }

}
