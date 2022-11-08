import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IDeptAccount } from "src/app/models/components/dept/IDeptAccount";
import { IDeptDto } from "src/app/models/components/dept/IDeptDto";
import { IDeptStatement } from "src/app/models/components/dept/IDeptStatement";
import { IDeptUser } from "src/app/models/components/dept/IDeptUser";
import { ControllUrl } from "../control.enum";

@Injectable()
export class DeptService {

  constructor(private http: HttpClient) {}

  private baseUrl = ControllUrl.DEPT;

  public getDeptUsersList(): Observable<IDeptUser[]>{
    return this.http.post<IDeptUser[]>(this.baseUrl + 'deptsusers', 'sth');
  }

  public createNewAccount(accountName: string, userId: string, deptUsersIds: string[]){
    const reqest = {
      accountName: accountName,
      userId: userId,
      deptUsersIds: deptUsersIds
    }
    return this.http.post<any>(this.baseUrl + 'create', reqest).toPromise().then(() => {
    });
  }

  public getUserIdByUserName(userName: string) {
    return this.http.get<any>(this.baseUrl + 'getUserIdByName/' + userName);
  }

  public getDeptAccountByUserId(userId: string): Observable<IDeptDto[]>{
    return this.http.get<IDeptDto[]>(this.baseUrl + 'list/' + userId);
  }

  public getDeptAccountDetailsById(accountId: string): Observable<IDeptAccount>{
    return this.http.get<IDeptAccount>(this.baseUrl + accountId);
  }

  public addDeptStatement(accountStatement: IDeptStatement, deptId: string, deptUserId: string) {
    const reqest = {
      amount: accountStatement.amount,
      title: accountStatement.title,
      description: accountStatement.description,
      deptId: deptId,
      deptUserId: deptUserId,
    }
    return this.http.post(this.baseUrl + 'addStatement', reqest).toPromise().then(() => {
    });
  }

  public deleteDeptAccount(accountId: string): Observable<string> {
    return this.http.get<string>(this.baseUrl + 'deleteDept/' + accountId);
  }

}
