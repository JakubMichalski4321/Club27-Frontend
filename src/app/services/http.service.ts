import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPajacyzm} from '../models/IPajacyzm';
import {IMem} from '../models/IMem';
import {ISoundboard} from '../models/ISoundboard';
import {IJugo} from '../models/IJugo';
@Injectable()
export class HttpService{

  constructor(private http: HttpClient) {
  }

  private localBaseUrl = '';  // URL to web api

  public getAllPajacyzmyList(): Observable<IPajacyzm[]>{
    return this.http.get<IPajacyzm[]>(this.localBaseUrl + 'pajacyzmy/allPajacyzmy');
  }

  public getAllMemyList(): Observable<IMem[]>{
    return this.http.get<IMem[]>(this.localBaseUrl + 'memy/allMemy');
  }

  public getAllSoundboardList(): Observable<ISoundboard[]>{
    return this.http.get<ISoundboard[]>(this.localBaseUrl + 'soundboard/allSoundboard');
  }

  public getAllJugoList(): Observable<IJugo[]>{
    return this.http.get<IJugo[]>(this.localBaseUrl + 'jugo/allJugo');
  }

  public getPajacyzm(pajacyzmId: any): Observable<IPajacyzm> {
    return this.http.get<IPajacyzm>(this.localBaseUrl + 'pajacyzmy/' + pajacyzmId);
  }
}
