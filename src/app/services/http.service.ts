import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPajacyzm} from '../models/IPajacyzm';
import {IMem} from '../models/IMem';
import {ISoundboard} from '../models/ISoundboard';
import {IJugo} from '../models/IJugo';
import {UploadMem} from '../models/uploadModels/UploadMem';
@Injectable()
export class HttpService{

  constructor(private http: HttpClient) {
  }

  private localBaseUrl = '';  // URL to web api

  public getPajacyzm(pajacyzmId: any): Observable<IPajacyzm> {
    return this.http.get<IPajacyzm>(this.localBaseUrl + 'pajacyzmy/' + pajacyzmId);
  }

  public getAllPajacyzmyList(): Observable<IPajacyzm[]>{
    return this.http.get<IPajacyzm[]>(this.localBaseUrl + 'pajacyzmy/allPajacyzmy');
  }

  public getMem(memId: any): Observable<IMem>{
    return this.http.get<IMem>(this.localBaseUrl + 'memy/' + memId);
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

  public submitPajacyzm(data: any){
    this.http.post(this.localBaseUrl + 'pajacyzmy/submitPajacyzm', data).toPromise().then((data: IPajacyzm) => {
      console.log(data);
    });
  }

  public submitMemeWithImage(data: UploadMem) {
    this.http.post(this.localBaseUrl + 'memy/submitMemeWithImage', data).toPromise().then((data: UploadMem) => {
      console.log(data);
    });
  }

  public submitMemeWithUrl(data: UploadMem) {
    this.http.post(this.localBaseUrl + 'memy/submitMemeWithUrl', data).toPromise().then((data: UploadMem) => {
      console.log(data);
    });
  }
}
