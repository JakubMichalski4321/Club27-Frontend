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
          userName: this.getUserNameFromToken(),
        }
      ));
  }

  getToken(): string{
    const fromStorage = JSON.parse(localStorage.getItem('klub27User'));
    if(fromStorage) {
      this.token = fromStorage.token;
    }
    return this.token;
  }

  getUserId(): string {
    let fromStorage = JSON.parse(localStorage.getItem('klub27User'));
    if(fromStorage.userId) {
      return fromStorage.userId;
    } else {
      this.httpService.getUserIdByUserName(this.getUserNameFromToken()).subscribe(response =>  {
        fromStorage.userId = response;
        localStorage.setItem('klub27User', JSON.stringify(fromStorage));
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
}
