import { Injectable } from '@angular/core';

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

  getToken(){
    let fromStorage = localStorage.getItem('klub27-token');
    if (fromStorage) {
      this.token = fromStorage;
    }
    return this.token;
  }
}
