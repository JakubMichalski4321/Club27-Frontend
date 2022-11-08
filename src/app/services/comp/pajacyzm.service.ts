import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PageRequest } from "src/app/models/common/PageRequest";
import { IPajacyzm } from "src/app/models/components/pajacyzm/IPajacyzm";
import { IPajacyzmyWithCounter } from "src/app/models/components/pajacyzm/IPajacyzmyWithCounter";
import { ControllUrl } from "../control.enum";


@Injectable()
export class PajacyzmService {

  constructor(private http: HttpClient) {}

  private baseUrl = ControllUrl.PAJACYZM;

  public getPajacyzm(pajacyzmId: any): Observable<IPajacyzm> {
    return this.http.get<IPajacyzm>(this.baseUrl + pajacyzmId);
  }

  public getAllPajacyzmyList(pageRequest: PageRequest): Observable<IPajacyzmyWithCounter>{
    return this.http.post<IPajacyzmyWithCounter>(this.baseUrl + 'pajacyzmy', pageRequest);
  }

  public submitPajacyzm(data: any){
    this.http.post(this.baseUrl + 'pajacyzm-submit', data).toPromise().then((data: IPajacyzm) => {
    });
  }

}
