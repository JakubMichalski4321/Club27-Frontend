import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { CheckedHour } from 'src/app/models/calendar/CheckedHour';
import { IUserWithCheckedHours } from 'src/app/models/calendar/IUserWithCheckedHours';
import { NavBarService } from 'src/app/services/nav-bar.service';
import * as moment from 'moment'
import { CalendarAddRequest } from 'src/app/models/calendar/CalendarAddRequest';
import { HttpService } from 'src/app/services/http.service';
import { CalendarWeekRequest } from 'src/app/models/calendar/CalendarWeekRequest';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  DAY_OF_THE_WEEK_NAMES: string[] = ['Pon', 'Wt', 'Śr', 'Czw', 'Piątunio', 'Sobota', '..i humor popsuty'];
  hours: number[] = [];
  dayOfWeek: number[] = [1, 2, 3, 4, 5, 6, 7];

  mondayDate: any;
  sundayDate: any;

  calendarHourArray: IUserWithCheckedHours[] = [];

  constructor(
    private navBarService: NavBarService,
    private httpService: HttpService,
    ) { }

  ngOnInit(): void {
    this.setMondayAndSundayDate();
    this.generateHours();
    this.getWeekCalendar();
  }

  private generateHours() {
    for(let i=12; i<=24; i++) {
      this.hours.push(i);
    }
    for(let i=1; i<=12; i++) {
      this.hours.push(i);
    }
  }

  getHourUsers(day: number, hour: number): string[] {
    return this.calendarHourArray.filter(user =>
      user.checkedHours.find(ch =>
        ch.day == day && ch.hour == hour) != null)
      .map(user => user.username);
  }

  isLoggedIn(): boolean {
    return this.navBarService.isLoggedIn();
  }

  checkOrUncheckHour(day: number, hour: number): void {
    if(this.isChecked(day, hour)) {
      const id = this.calendarHourArray.find(user => user.username === 'jackob')
      .checkedHours.find(ch => ch.day == day && ch.hour == hour).id;
      this.calendarHourArray.find(user => user.username === 'jackob')
        .checkedHours
        .splice(this.calendarHourArray.find(user => user.username === 'jackob')
        .checkedHours.findIndex(ch => ch.id === id), 1);
      this.removeUserCheckedHour(id);
    } else {
      this.saveUserCheckedHours(day, hour);
    }
  }

  private saveUserCheckedHours(day: number, hour: number) {
    //!!!!!!
    let username: string = 'jackob';

    const checkedHours = new CheckedHour();
    checkedHours.day = day;
    checkedHours.hour = hour;

    const request = new CalendarAddRequest();
    request.username = username;
    request.day = day;
    request.hour = hour;
    request.weekStartDate = this.mondayDate.format('DD.MM.YYYY');
    request.weekEndDate = this.sundayDate.format('DD.MM.YYYY');

    this.httpService.addCalendar(request).subscribe((resp) => {
      if (this.calendarHourArray.filter(user => user.username === 'jackob').length > 0) {
        this.calendarHourArray.find(user => user.username === 'jackob')
        .checkedHours.push( {
          id: resp.value,
          hour: hour,
          day: day,
        });
      } else {
        this.calendarHourArray.push({
          username: 'jackob',
          checkedHours: [
            {
              id: resp.value,
              hour: hour,
              day: day,
            },
          ]
        });
      }
    });
  }

  private removeUserCheckedHour(id: string): void {
    this.httpService.removeCalendar(id).subscribe();
  }

  private getHourFromArray(day: number, hour: number): IUserWithCheckedHours {
    return this.calendarHourArray.find(
      user => user.username === 'jackob' && user.checkedHours.find(
        ch => ch.day == day && ch.hour == hour) != null);
  }

  isChecked(day: number, hour: number): boolean {
    return this.getHourFromArray(day, hour) != null;
  }

  private setMondayAndSundayDate() {
    const firstDay = moment().startOf('week').toDate();
    const mondayDate = new Date(firstDay.setDate(firstDay.getDate() - 6));
    const sundayDate = new Date(firstDay.setDate(firstDay.getDate() + 6));
    this.mondayDate = moment(mondayDate);
    this.sundayDate = moment(sundayDate);
  }

  goNextWeek() {
    const mondayDate = new Date(this.mondayDate.toDate().setDate( this.mondayDate.toDate().getDate() + 6));
    const sundayDate = new Date(this.sundayDate.toDate().setDate( this.sundayDate.toDate().getDate() + 6));
    this.mondayDate = moment(mondayDate);
    this.sundayDate = moment(sundayDate);
    this.getWeekCalendar();
  }

  goBeforeWeek() {
    const mondayDate = new Date(this.mondayDate.toDate().setDate( this.mondayDate.toDate().getDate() - 6));
    const sundayDate = new Date(this.sundayDate.toDate().setDate( this.sundayDate.toDate().getDate() - 6));
    this.mondayDate = moment(mondayDate);
    this.sundayDate = moment(sundayDate);
    this.getWeekCalendar();
  }

  getWeekCalendar(): void {
    const request = new CalendarWeekRequest();
    request.weekStartDate = this.mondayDate.format('DD.MM.YYYY');
    request.weekEndDate = this.sundayDate.format('DD.MM.YYYY');
    this.httpService.getCalendarWeek(request).subscribe((resp) => {
      this.calendarHourArray = resp;
    });
  }

}
