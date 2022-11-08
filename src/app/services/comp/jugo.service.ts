import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { IJugo } from "src/app/models/components/jugo/IJugo";
import { ControllUrl } from "../control.enum";

@Injectable()
export class JugoService {

  constructor(private http: HttpClient) {}

  private baseUrl = ControllUrl.JUGO;

  public getAllJugoList(): Observable<IJugo[]>{
    return this.http.get<IJugo[]>(this.baseUrl + 'jugos');
  }

  public addLikeToJugo(jugoId: string): Subscription{
    return this.http.get<any>(this.baseUrl + jugoId + "/like-add").subscribe();
  }

}
