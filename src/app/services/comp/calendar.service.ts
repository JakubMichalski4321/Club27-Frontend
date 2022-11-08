import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IStringWrapper } from "../../models/common/IStringWrapper";
import { CalendarAddRequest } from "../../models/components/calendar/CalendarAddRequest";
import { CalendarWeekRequest } from "../../models/components/calendar/CalendarWeekRequest";
import { IHourCheck } from "../../models/components/calendar/IUserWithCheckedHours";
import { ControllUrl } from "../control.enum";

@Injectable()
export class CalendarService {

  constructor(private http: HttpClient) {}

  private baseUrl = ControllUrl.CALENDAR;

  public getCalendarWeek(reqest: CalendarWeekRequest): Observable<IHourCheck[]>{
    return this.http.post<IHourCheck[]>(this.baseUrl + 'getWeek', reqest);
  }

  public addCalendar(request: CalendarAddRequest): Observable<IStringWrapper> {
    return this.http.post<IStringWrapper>(this.baseUrl + 'add', request);
  }

  public removeCalendar(id: string): Observable<void> {
    return this.http.get<void>(this.baseUrl + 'remove/' + id);
  }

}
