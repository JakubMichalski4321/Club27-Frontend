import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { from } from 'rxjs';
import { IJwtToken } from '../components/user/login/IJwtToken';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BearerTokenService {

  constructor(
    private httpService: HttpService
  ) { }

  private token: string = null;

  saveToken(token: string){
      this.token = token;
      localStorage.setItem('klub27User', JSON.stringify(
        {
          token: token,
          username: jwt_decode(token)['sub']
        }
      ));
  }

  getToken(): string{
    if(this.token) {
      return this.token;
    } else if (JSON.parse(localStorage.getItem('klub27User'))){
      return JSON.parse(localStorage.getItem('klub27User')).token;
    };
  }

  isTokenAfterExpired(token: string): boolean {
    if(!token) {
      return true;
    }
    if(new Date() > new Date(jwt_decode(this.getToken())['exp'] * 1000)) {
      return true;
    }
    return false;
  }

  getUserId(): string {
    let fromStorage = JSON.parse(localStorage.getItem('klub27User'));
    if(fromStorage && fromStorage.userId) {
      return fromStorage.userId;
    } else if(this.getUserNameFromToken()) {
      this.httpService.getUserIdByUserName(this.getUserNameFromToken()).subscribe(resp =>  {
        fromStorage.userId = resp.value;
        localStorage.setItem('klub27User', JSON.stringify(fromStorage));
        return resp.value;
      });
    }
  }

  getUserNameFromToken(): string {
    if(JSON.parse(localStorage.getItem('klub27User')) != null && JSON.parse(localStorage.getItem('klub27User')).username) {
      console.log(new Date(jwt_decode(this.getToken())['exp'] * 1000))
      return JSON.parse(localStorage.getItem('klub27User')).username;
    }
    try {
      return jwt_decode(this.getToken())['sub'];
    } catch(Error) {
      return null;
    }
  }

  logOut(): void {
    localStorage.removeItem('klub27User');
  }
}
