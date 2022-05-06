import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { IJwtToken } from '../components/user/login/IJwtToken';

@Injectable({
  providedIn: 'root'
})
export class BearerTokenService {

  constructor() { }

  private token: string = null;

  saveToken(token: string){
      this.token = token;
      localStorage.setItem('klub27-token', token);
  }

  getToken(): string{
    let fromStorage = localStorage.getItem('klub27-token');
    if (fromStorage) {
      this.token = fromStorage;
    }
    return this.token;
  }

  getUserNameFromToken(): string {
    try {
      return jwt_decode(this.getToken())['sub'];
    } catch(Error) {
      return null;
    }
  }
}
