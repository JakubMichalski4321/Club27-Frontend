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
          token: token
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

  getUserId(): string {
    let fromStorage = JSON.parse(localStorage.getItem('klub27User'));
    if(fromStorage && fromStorage.userId) {
      return fromStorage.userId;
    } else {
      this.httpService.getUserIdByUserName(this.getUserNameFromToken()).subscribe(response =>  {
        console.log(response);
        fromStorage.userId = response;
        localStorage.setItem('klub27User', JSON.stringify(fromStorage));
        return response;
      });
    }
  }

  getUserNameFromToken(): string {
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
