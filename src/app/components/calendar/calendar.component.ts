import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { CheckedHour } from 'src/app/models/calendar/CheckedHour';
import { IHourCheck } from 'src/app/models/calendar/IUserWithCheckedHours';
import { NavBarService } from 'src/app/services/nav-bar.service';
import * as moment from 'moment';
import { CalendarAddRequest } from 'src/app/models/calendar/CalendarAddRequest';
import { HttpService } from 'src/app/services/http.service';
import { CalendarWeekRequest } from 'src/app/models/calendar/CalendarWeekRequest';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  DAY_OF_THE_WEEK_NAMES: string[] = [
    'Pon',
    'Wt',
    'Śr',
    'Czw',
    'Piątunio',
    'Sobota',
    '..i humor popsuty',
  ];
  DAY_OF_WEEK_NUM: number[] = [1, 2, 3, 4, 5, 6, 7];

  username: string;
  showLogin = false;
  hours: number[] = [];
  mondayDate: any;
  sundayDate: any;
  calendarHourArray: IHourCheck[] = [];

  constructor(
    private navBarService: NavBarService,
    private httpService: HttpService,
  ) {}

  ngOnInit(): void {
    this.username = this.navBarService.getUserNameFromToken();
    if (!this.isLoggedIn()) {
      this.delay(2700);
    }
    this.setMondayAndSundayDate();
    this.generateHours();
    this.getWeekCalendar();
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.showLogin = true;
      }, ms)
    );
  }

  private generateHours(): void {
    for (let i = 12; i <= 24; i++) {
      this.hours.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.hours.push(i);
    }
  }

  getHourUsers(day: number, hour: number): string[] {
    return this.calendarHourArray
      .filter(
        (user) =>
          user.checkedHours.find((ch) => ch.day == day && ch.hour == hour) !=
          null
      )
      .map((user) => user.username);
  }

  isLoggedIn(): boolean {
    return this.navBarService.isLoggedIn();
  }

  checkOrUncheckHour(day: number, hour: number): void {
    if (this.isChecked(day, hour)) {
      const id = this.getHourFromArray(day, hour).checkedHours.find(
        (ch) => ch.day == day && ch.hour == hour
      ).id;
      this.calendarHourArray
        .find((user) => user.username === this.username)
        .checkedHours.splice(
          this.calendarHourArray
            .find((user) => user.username === this.username)
            .checkedHours.findIndex((ch) => ch.id === id),
          1
        );
      this.removeUserCheckedHour(id);
    } else {
      this.saveUserCheckedHours(day, hour);
    }
  }

  private saveUserCheckedHours(day: number, hour: number): void {
    const checkedHours = new CheckedHour();
    checkedHours.day = day;
    checkedHours.hour = hour;

    const request = new CalendarAddRequest();
    request.username = this.username;
    request.day = day;
    request.hour = hour;
    request.weekStartDate = this.mondayDate.format('DD.MM.YYYY');
    request.weekEndDate = this.sundayDate.format('DD.MM.YYYY');

    this.httpService.addCalendar(request).subscribe((resp) => {
      if (
        this.calendarHourArray.filter((user) => user.username === this.username)
          .length > 0
      ) {
        this.calendarHourArray
          .find((user) => user.username === this.username)
          .checkedHours.push(this.createCheckedHour(day, hour, resp.value));
      } else {
        this.calendarHourArray.push({
          username: this.username,
          checkedHours: [this.createCheckedHour(day, hour, resp.value)],
        });
      }
    });
  }

  private removeUserCheckedHour(id: string): void {
    this.httpService.removeCalendar(id).subscribe();
  }

  private createCheckedHour(day: number, hour: number, id?: string): CheckedHour {
    return {
      day: day,
      hour: hour,
      id: id,
    };
  }

  private getHourFromArray(day: number, hour: number): IHourCheck {
    return this.calendarHourArray.find(
      (user) =>
        user.username === this.username &&
        user.checkedHours.find((ch) => ch.day == day && ch.hour == hour) != null
    );
  }

  isChecked(day: number, hour: number): boolean {
    return this.getHourFromArray(day, hour) != null;
  }

  private setMondayAndSundayDate(): void {
    const firstDay = moment().startOf('week').toDate();
    const mondayDate = new Date(firstDay.setDate(firstDay.getDate() - 6));
    const sundayDate = new Date(firstDay.setDate(firstDay.getDate() + 6));
    this.mondayDate = moment(mondayDate);
    this.sundayDate = moment(sundayDate);
  }

  goNextWeek(): void {
    const mondayDate = new Date(
      this.mondayDate.toDate().setDate(this.mondayDate.toDate().getDate() + 6)
    );
    const sundayDate = new Date(
      this.sundayDate.toDate().setDate(this.sundayDate.toDate().getDate() + 6)
    );
    this.mondayDate = moment(mondayDate);
    this.sundayDate = moment(sundayDate);
    this.getWeekCalendar();
  }

  goBeforeWeek(): void {
    const mondayDate = new Date(
      this.mondayDate.toDate().setDate(this.mondayDate.toDate().getDate() - 6)
    );
    const sundayDate = new Date(
      this.sundayDate.toDate().setDate(this.sundayDate.toDate().getDate() - 6)
    );
    this.mondayDate = moment(mondayDate);
    this.sundayDate = moment(sundayDate);
    this.getWeekCalendar();
  }

  private getWeekCalendar(): void {
    const request = new CalendarWeekRequest();
    request.weekStartDate = this.mondayDate.format('DD.MM.YYYY');
    request.weekEndDate = this.sundayDate.format('DD.MM.YYYY');
    this.httpService.getCalendarWeek(request).subscribe((resp) => {
      this.calendarHourArray = resp;
    });
  }
}
