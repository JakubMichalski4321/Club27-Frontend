import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ControllUrl } from "../control.enum";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  private baseUrl = ControllUrl.USER;

}
