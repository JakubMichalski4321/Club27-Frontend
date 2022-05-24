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
import { PageRequest } from '../models/PageRequest';
import { Page } from 'ngx-pagination/dist/pagination-controls.directive';
import { IPajacyzmyWithCounter } from '../models/IPajacyzmyWithCounter';
@Injectable()
export class HttpService{

  constructor(private http: HttpClient) {
  }

  private localBaseUrl = '';  // URL to web api
  private pajacyzmyUrl = 'pajacyzmy/';
  private memeUrl = 'meme/';
  private jugoUrl = 'jugo/'
  private soudboardUrl = 'soundboard/';

  public getPajacyzm(pajacyzmId: any): Observable<IPajacyzm> {
    return this.http.get<IPajacyzm>(this.localBaseUrl + this.pajacyzmyUrl + pajacyzmId);
  }

  public getAllPajacyzmyList(pageRequest: PageRequest): Observable<IPajacyzmyWithCounter>{
    return this.http.post<IPajacyzmyWithCounter>(this.localBaseUrl + this.pajacyzmyUrl + 'pajacyzmy', pageRequest);
  }

  public submitPajacyzm(data: any){
    this.http.post(this.localBaseUrl +  this.pajacyzmyUrl + 'pajacyzm-submit', data).toPromise().then((data: IPajacyzm) => {
      console.log(data);
    });
  }

  public getMem(memId: any): Observable<IMem>{
    return this.http.get<IMem>(this.localBaseUrl + this.memeUrl + memId);
  }

  public getAllMemyList(): Observable<IMem[]>{
    return this.http.get<IMem[]>(this.localBaseUrl + this.memeUrl + 'memy');
  }

  public getMemeComments(id: string): Observable<IMemeComment[]> {
    return this.http.get<IMemeComment[]>(this.localBaseUrl + this.memeUrl + id + '/comments');
  }

  public submitMeme(data: UploadMem) {
    this.http.post(this.localBaseUrl + this.memeUrl + 'meme-submit', data).toPromise().then((data: UploadMem) => {
      console.log(data);
    });
  }

  public submitMemeImage(file: File, currentTime: number) {
    let formData: FormData = new FormData();
    formData.append('file', file, currentTime + '_' + file.name);
    this.http.post(this.localBaseUrl + this.memeUrl + 'meme-image-submit', formData).toPromise().then((data: FormData) => {
      console.log(data);
    });
  }

  public submitMemeComment(data: UploadMemeComment) {
    this.http.post(this.localBaseUrl + this.memeUrl + 'meme-comment-submit', data).toPromise().then((data: UploadMemeComment) => {
      console.log(data);
    });
  }

  public addLikeToMeme(memeId: string): Subscription{
    return this.http.get<any>(this.localBaseUrl + this.memeUrl + memeId + "/like-add").subscribe();;
  }

  public getAllJugoList(): Observable<IJugo[]>{
    console.log("CALL FOR JUGOS")
    return this.http.get<IJugo[]>(this.localBaseUrl + this.jugoUrl + 'jugos');
  }

  public getAllSoundboardList(): Observable<ISoundboard[]>{
    return this.http.get<ISoundboard[]>(this.localBaseUrl + this.soudboardUrl + 'all-soundboard');
  }

  public addLikeToJugo(jugoId: string): Subscription{
    return this.http.get<any>(this.localBaseUrl + this.jugoUrl + jugoId + "/like-add").subscribe();;
  }

  public submitSoundboard(data: UploadSoundboard){
    this.http.post(this.localBaseUrl + this.jugoUrl + 'soundboard-submit', data).toPromise().then((data: UploadSoundboard) => {
      console.log(data);
    });
  }

  public submitSoundboardSound(file: File, pathToFile: any){
    let formData: FormData = new FormData();
    formData.append('file', file, pathToFile);
    return this.http.post(this.localBaseUrl + this.soudboardUrl + 'soundboard-sound-submit', formData).toPromise().then((data: FormData) => {
      console.log(data);
    });
  }

}
