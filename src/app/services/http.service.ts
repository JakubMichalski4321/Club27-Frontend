import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
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

  public submitMeme(data: UploadMem) {
    this.http.post(this.localBaseUrl + 'memy/submitMeme', data).toPromise().then((data: UploadMem) => {
      console.log(data);
    });
  }

  public submitMemeImage(file: File, currentTime: number) {
    let formData: FormData = new FormData();
    formData.append('file', file, currentTime + '_' + file.name);
    /*
     const req = new HttpRequest('POST', `${this.localBaseUrl}memy/submitMemeImage`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
     */
    this.http.post(this.localBaseUrl + 'memy/submitMemeImage', formData).toPromise().then((data: FormData) => {
      console.log(data);
    });
  }
}
