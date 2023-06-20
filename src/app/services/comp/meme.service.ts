import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { PageRequest } from "src/app/models/common/PageRequest";
import { IMeme } from "src/app/models/components/meme/IMeme";
import { IMemeComment } from "src/app/models/components/meme/IMemeComment";
import { IMemesWithCounter } from "src/app/models/components/meme/IMemesWithCounter";
import { UploadMem } from "src/app/models/components/meme/UploadMem";
import { UploadMemeComment } from "src/app/models/components/meme/UploadMemeComment";
import { ControllUrl } from "../control.enum";


@Injectable()
export class MemeService {

  constructor(private http: HttpClient) { }

  private baseUrl = ControllUrl.MEME;

  public getMeme(memeId: any): Observable<IMeme> {
    return this.http.get<IMeme>(this.baseUrl + memeId);
  }

  public getAllMemesList(pageRequest: PageRequest): Observable<IMemesWithCounter> {
    return this.http.post<IMemesWithCounter>(this.baseUrl + 'memes', pageRequest);
  }

  public getMemeComments(id: string): Observable<IMemeComment[]> {
    return this.http.get<IMemeComment[]>(this.baseUrl + id + '/comments');
  }

  public submitMeme(data: UploadMem): Observable<any> {
    return this.http.post(this.baseUrl + 'meme-submit', data);
  }

  public submitMemeWithImage(meme: UploadMem, file: File, currentTime: number) {
    let formData: FormData = new FormData();
    formData.append('file', file, currentTime + '_' + file.name);
    formData.append('meme', JSON.stringify(meme));
    return this.http.post(this.baseUrl + 'meme-image-submit', formData);
  }

  public submitMemeComment(data: UploadMemeComment) {
    this.http.post(this.baseUrl + 'meme-comment-submit', data).toPromise().then((data: UploadMemeComment) => {
    });
  }

  public addLikeToMeme(memeId: string): Subscription {
    return this.http.get<any>(this.baseUrl + memeId + "/like-add").subscribe();;
  }

}
