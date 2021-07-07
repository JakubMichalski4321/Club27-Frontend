import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {IPajacyzm} from '../models/IPajacyzm';
import {IMem} from '../models/IMem';
import {ISoundboard} from '../models/ISoundboard';
import {IJugo} from '../models/IJugo';
import {UploadMem} from '../models/uploadModels/UploadMem';
import {UploadSoundboard} from '../models/uploadModels/UploadSoundboard';
import {IMemeComment} from '../models/IMemeComment';
import {UploadMemeComment} from '../models/uploadModels/UploadMemeComment';
@Injectable()
export class HttpService{

  constructor(private http: HttpClient) {
  }

  private localBaseUrl = '';  // URL to web api

  public getPajacyzm(pajacyzmId: any): Observable<IPajacyzm> {
    return this.http.get<IPajacyzm>(this.localBaseUrl + 'pajacyzmy/' + pajacyzmId);
  }

  public getAllPajacyzmyList(): Observable<IPajacyzm[]>{
    return this.http.get<IPajacyzm[]>(this.localBaseUrl + 'pajacyzmy/pajacyzmy-all');
  }

  public submitPajacyzm(data: any){
    this.http.post(this.localBaseUrl + 'pajacyzmy/pajacyzm-submit', data).toPromise().then((data: IPajacyzm) => {
      console.log(data);
    });
  }

  public getMem(memId: any): Observable<IMem>{
    return this.http.get<IMem>(this.localBaseUrl + 'meme/' + memId);
  }

  public getAllMemyList(): Observable<IMem[]>{
    return this.http.get<IMem[]>(this.localBaseUrl + 'meme/meme-all');
  }

  public getMemeComments(id: string): Observable<IMemeComment[]> {
    return this.http.get<IMemeComment[]>(this.localBaseUrl + 'meme/' + id + '/comments-all');
  }

  public submitMeme(data: UploadMem) {
    this.http.post(this.localBaseUrl + 'meme/meme-submit', data).toPromise().then((data: UploadMem) => {
      console.log(data);
    });
  }

  public submitMemeImage(file: File, currentTime: number) {
    let formData: FormData = new FormData();
    formData.append('file', file, currentTime + '_' + file.name);
    this.http.post(this.localBaseUrl + 'meme/meme-image-submit', formData).toPromise().then((data: FormData) => {
      console.log(data);
    });
  }

  public submitMemeComment(data: UploadMemeComment) {
    this.http.post(this.localBaseUrl + 'meme/meme-comment-submit', data).toPromise().then((data: UploadMemeComment) => {
      console.log(data);
    });
  }

  public addLikeToMeme(memeId: string): Subscription{
    return this.http.get<any>(this.localBaseUrl +"meme/" + memeId + "/like-add").subscribe();;
  }

  public getAllJugoList(): Observable<IJugo[]>{
    return this.http.get<IJugo[]>(this.localBaseUrl + 'jugo/jugo-all');
  }

  public getAllSoundboardList(): Observable<ISoundboard[]>{
    return this.http.get<ISoundboard[]>(this.localBaseUrl + 'soundboard/all-soundboard');
  }

  public submitSoundboard(data: UploadSoundboard){
    this.http.post(this.localBaseUrl + 'soundboard/soundboard-submit', data).toPromise().then((data: UploadSoundboard) => {
      console.log(data);
    });
  }

  public submitSoundboardSound(file: File, pathToFile: any){
    let formData: FormData = new FormData();
    formData.append('file', file, pathToFile);
    return this.http.post(this.localBaseUrl + 'soundboard/soundboard-sound-submit', formData).toPromise().then((data: FormData) => {
      console.log(data);
    });
  }
}
