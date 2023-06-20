import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { PageRequest } from "src/app/models/common/PageRequest";
import { IJugoWithCounter } from "src/app/models/components/jugo/IJugosWithCounter";
import { SubmitJugo } from "src/app/models/components/jugo/UploadJugo";
import { ControllUrl } from "../control.enum";

@Injectable()
export class JugoService {

  constructor(private http: HttpClient) { }

  private baseUrl = ControllUrl.JUGO;

  public getAllJugoList(pageRequest: PageRequest): Observable<IJugoWithCounter> {
    return this.http.post<IJugoWithCounter>(this.baseUrl + 'jugos', pageRequest);
  }

  public addLikeToJugo(jugoId: string): Subscription {
    return this.http.get<any>(this.baseUrl + jugoId + "/like-add").subscribe();
  }

  public submitJugo(jugo: SubmitJugo): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'jugo-submit', jugo);
  }

}
