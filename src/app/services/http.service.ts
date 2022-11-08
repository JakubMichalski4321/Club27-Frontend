import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {IPajacyzm} from '../models/components/pajacyzm/IPajacyzm';
import {IMeme} from '../models/components/meme/IMeme';
import {ISoundboard} from '../models/components/soundboard/ISoundboard';
import {IJugo} from '../models/components/jugo/IJugo';
import {UploadSoundboard} from '../models/components/soundboard/UploadSoundboard';
import {IMemeComment} from '../models/components/meme/IMemeComment';
import {UploadMemeComment} from '../models/components/meme/UploadMemeComment';
import { PageRequest } from '../models/common/PageRequest';
import { IDeptAccount } from '../models/components/dept/IDeptAccount';
import { CalendarAddRequest } from '../models/components/calendar/CalendarAddRequest';
import { IHourCheck } from '../models/components/calendar/IUserWithCheckedHours';
import { CalendarWeekRequest } from '../models/components/calendar/CalendarWeekRequest';
import { IStringWrapper } from '../models/common/IStringWrapper';
import { IDeptDto } from '../models/components/dept/IDeptDto';
import { IDeptStatement } from '../models/components/dept/IDeptStatement';
import { IDeptUser } from '../models/components/dept/IDeptUser';
import { IMemesWithCounter } from '../models/components/meme/IMemesWithCounter';
import { UploadMem } from '../models/components/meme/UploadMem';
import { IPajacyzmyWithCounter } from '../models/components/pajacyzm/IPajacyzmyWithCounter';

@Injectable()
export class HttpService{

  constructor(private http: HttpClient) {
  }

  private localBaseUrl = '';  // URL to web api
  private pajacyzmyUrl = 'pajacyzmy/';
  private memeUrl = 'meme/';
  private jugoUrl = 'jugo/'
  private soudboardUrl = 'soundboard/';
  private deptUrl = 'dept/';
  private calendarUrl = 'calendar/'

  public getPajacyzm(pajacyzmId: any): Observable<IPajacyzm> {
    return this.http.get<IPajacyzm>(this.localBaseUrl + this.pajacyzmyUrl + pajacyzmId);
  }

  public getAllPajacyzmyList(pageRequest: PageRequest): Observable<IPajacyzmyWithCounter>{
    return this.http.post<IPajacyzmyWithCounter>(this.localBaseUrl + this.pajacyzmyUrl + 'pajacyzmy', pageRequest);
  }

  public submitPajacyzm(data: any){
    this.http.post(this.localBaseUrl +  this.pajacyzmyUrl + 'pajacyzm-submit', data).toPromise().then((data: IPajacyzm) => {
    });
  }

  public getMeme(memeId: any): Observable<IMeme>{
    return this.http.get<IMeme>(this.localBaseUrl + this.memeUrl + memeId);
  }

  public getAllMemesList(pageRequest: PageRequest): Observable<IMemesWithCounter>{
    return this.http.post<IMemesWithCounter>(this.localBaseUrl + this.memeUrl + 'memes', pageRequest);
  }

  public getMemeComments(id: string): Observable<IMemeComment[]> {
    return this.http.get<IMemeComment[]>(this.localBaseUrl + this.memeUrl + id + '/comments');
  }

  public submitMeme(data: UploadMem) {
    this.http.post(this.localBaseUrl + this.memeUrl + 'meme-submit', data).toPromise().then((data: UploadMem) => {
    });
  }

  public submitMemeImage(file: File, currentTime: number) {
    let formData: FormData = new FormData();
    formData.append('file', file, currentTime + '_' + file.name);
    this.http.post(this.localBaseUrl + this.memeUrl + 'meme-image-submit', formData).toPromise().then((data: FormData) => {
    });
  }

  public submitMemeComment(data: UploadMemeComment) {
    this.http.post(this.localBaseUrl + this.memeUrl + 'meme-comment-submit', data).toPromise().then((data: UploadMemeComment) => {
    });
  }

  public addLikeToMeme(memeId: string): Subscription{
    return this.http.get<any>(this.localBaseUrl + this.memeUrl + memeId + "/like-add").subscribe();;
  }

  public getAllJugoList(): Observable<IJugo[]>{
    return this.http.get<IJugo[]>(this.localBaseUrl + this.jugoUrl + 'jugos');
  }

  public getAllSoundboardList(): Observable<ISoundboard[]>{
    return this.http.get<ISoundboard[]>(this.localBaseUrl + this.soudboardUrl + 'soundboards');
  }

  public addLikeToJugo(jugoId: string): Subscription{
    return this.http.get<any>(this.localBaseUrl + this.jugoUrl + jugoId + "/like-add").subscribe();
  }

  public submitSoundboard(data: UploadSoundboard){
    this.http.post(this.localBaseUrl + this.jugoUrl + 'soundboard-submit', data).toPromise().then((data: UploadSoundboard) => {
    });
  }

  public submitSoundboardSound(file: File, pathToFile: any){
    let formData: FormData = new FormData();
    formData.append('file', file, pathToFile);
    return this.http.post(this.localBaseUrl + this.soudboardUrl + 'soundboard-sound-submit', formData).toPromise().then((data: FormData) => {
    });
  }

  public getDeptUsersList(): Observable<IDeptUser[]>{
    return this.http.post<IDeptUser[]>(this.localBaseUrl + this.deptUrl + 'deptsusers', 'sth');
  }

  public createNewAccount(accountName: string, userId: string, deptUsersIds: string[]){
    const reqest = {
      accountName: accountName,
      userId: userId,
      deptUsersIds: deptUsersIds
    }
    return this.http.post<any>(this.localBaseUrl + this.deptUrl + 'create', reqest).toPromise().then(() => {
    });
  }

  public getUserIdByUserName(userName: string) {
    return this.http.get<any>(this.localBaseUrl + this.deptUrl + 'getUserIdByName/' + userName);
  }

  public getDeptAccountByUserId(userId: string): Observable<IDeptDto[]>{
    return this.http.get<IDeptDto[]>(this.localBaseUrl + this.deptUrl + 'list/' + userId);
  }

  public getDeptAccountDetailsById(accountId: string): Observable<IDeptAccount>{
    return this.http.get<IDeptAccount>(this.localBaseUrl + this.deptUrl + accountId);
  }

  public addDeptStatement(accountStatement: IDeptStatement, deptId: string, deptUserId: string) {
    const reqest = {
      amount: accountStatement.amount,
      title: accountStatement.title,
      description: accountStatement.description,
      deptId: deptId,
      deptUserId: deptUserId,
    }
    return this.http.post(this.localBaseUrl + this.deptUrl + 'addStatement', reqest).toPromise().then(() => {
    });
  }

  public deleteDeptAccount(accountId: string): Observable<string> {
    return this.http.get<string>(this.localBaseUrl + this.deptUrl + 'deleteDept/' + accountId);
  }

  public getCalendarWeek(reqest: CalendarWeekRequest): Observable<IHourCheck[]>{
    return this.http.post<IHourCheck[]>(this.localBaseUrl + this.calendarUrl + 'getWeek', reqest);
  }

  public addCalendar(request: CalendarAddRequest): Observable<IStringWrapper> {
    return this.http.post<IStringWrapper>(this.localBaseUrl + this.calendarUrl + 'add', request);
  }

  public removeCalendar(id: string): Observable<void> {
    return this.http.get<void>(this.localBaseUrl + this.calendarUrl + 'remove/' + id);
  }

}
