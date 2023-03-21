import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IStringWrapper } from "src/app/models/common/IStringWrapper";
import { IAddDietStatement } from "src/app/models/components/diet/IAddDietStatementRequest";
import { IDiet } from "src/app/models/components/diet/IDiet";
import { IDietStatement } from "src/app/models/components/diet/IDietStatement";
import { ControllUrl } from "../control.enum";

@Injectable()
export class DietService {

  constructor(private http: HttpClient) {}

  private baseUrl = ControllUrl.DIET;

  public getUserDiet(userId: string): Observable<IDiet> {
    return this.http.get<IDiet>(this.baseUrl + 'getuserdiet/' + userId);
  }

  public getDiets(): Observable<IDiet[]> {
    return this.http.get<IDiet[]>(this.baseUrl + 'getdiets');
  }

  public addDiet(newDiet: any): Observable<any> {
    return this.http.post(this.baseUrl + "adddiet", newDiet);
  }

  public getDietStatements(dietId: string): Observable<IDietStatement[]> {
    return this.http.get<IDietStatement[]>(this.baseUrl + 'getdietstatements/' + dietId);
  }

  public addDietStatement(request: IAddDietStatement): Observable<IStringWrapper> {
    return this.http.post<IStringWrapper>(this.baseUrl + 'adddietstatement', request);
  }

}
