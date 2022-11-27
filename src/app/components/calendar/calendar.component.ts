import { Component, OnInit } from '@angular/core';
import { CheckedHour } from 'src/app/models/components/calendar/CheckedHour';
import { IHourCheck } from 'src/app/models/components/calendar/IUserWithCheckedHours';
import * as moment from 'moment';
import { CalendarAddRequest } from 'src/app/models/components/calendar/CalendarAddRequest';
import { CalendarWeekRequest } from 'src/app/models/components/calendar/CalendarWeekRequest';
import { CalendarService } from 'src/app/services/comp/calendar.service';
import { BearerTokenService } from 'src/app/services/user/bearer-token.service';

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

  showLogin = false;
  hours: number[] = [];
  mondayDate: any;
  sundayDate: any;
  calendarHourArray: IHourCheck[] = [];

  private FIRST_CALL: boolean = true;

  constructor(
    private tokenService: BearerTokenService,
    private calendarService: CalendarService,
  ) {}

  ngOnInit(): void {
    if (!this.isLoggedIn()) {
      this.delay(2700);
    } else {
      this.setMondayAndSundayDate();
      this.generateHours();
      this.getWeekCalendar();
    }
  }

  afterLogin() {
    if(this.FIRST_CALL) {
      this.FIRST_CALL = false;
      this.ngOnInit();
    }
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
    for (let i = 1; i < 12; i++) {
      this.hours.push(i);
    }
  }

  public getHourUsers(day: number, hour: number): string[] {
    return this.calendarHourArray
      .filter(
        (user) =>
          user.checkedHours.find((ch) => ch.day == day && ch.hour == hour) !=
          null
      )
      .map((user) => user.username);
  }

  public isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  public checkOrUncheckHour(day: number, hour: number): void {
    if (this.isChecked(day, hour)) {
      const id = this.getHourFromArray(day, hour).checkedHours.find(
        (ch) => ch.day == day && ch.hour == hour
      ).id;
      this.calendarHourArray
        .find((user) => user.username === this.tokenService.getUserNameFromToken())
        .checkedHours.splice(
          this.calendarHourArray
            .find((user) => user.username === this.tokenService.getUserNameFromToken())
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
    request.username = this.tokenService.getUserNameFromToken();
    request.day = day;
    request.hour = hour;
    request.weekStartDate = this.mondayDate.format('DD.MM.YYYY');
    request.weekEndDate = this.sundayDate.format('DD.MM.YYYY');

    this.calendarService.addCalendar(request).subscribe((resp) => {
      if (
        this.calendarHourArray.filter((user) => user.username === this.tokenService.getUserNameFromToken())
          .length > 0
      ) {
        this.calendarHourArray
          .find((user) => user.username === this.tokenService.getUserNameFromToken())
          .checkedHours.push(this.createCheckedHour(day, hour, resp.value));
      } else {
        this.calendarHourArray.push({
          username: this.tokenService.getUserNameFromToken(),
          checkedHours: [this.createCheckedHour(day, hour, resp.value)],
        });
      }
    });
  }

  private removeUserCheckedHour(id: string): void {
    this.calendarService.removeCalendar(id).subscribe();
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
        user.username === this.tokenService.getUserNameFromToken() &&
        user.checkedHours.find((ch) => ch.day == day && ch.hour == hour) != null
    );
  }

  public isChecked(day: number, hour: number): boolean {
    return this.getHourFromArray(day, hour) != null;
  }

  private setMondayAndSundayDate(): void {
    const firstDay = moment().startOf('week').toDate();
    const mondayDate = new Date(firstDay.setDate(firstDay.getDate() + 1));
    const sundayDate = new Date(firstDay.setDate(firstDay.getDate() + 6));
    this.mondayDate = moment(mondayDate);
    this.sundayDate = moment(sundayDate);
  }

  public goNextWeek(): void {
    const mondayDate = new Date(
      this.mondayDate.toDate().setDate(this.mondayDate.toDate().getDate() + 7)
    );
    const sundayDate = new Date(
      this.sundayDate.toDate().setDate(this.sundayDate.toDate().getDate() + 7)
    );
    this.mondayDate = moment(mondayDate);
    this.sundayDate = moment(sundayDate);
    this.getWeekCalendar();
  }

  public goBeforeWeek(): void {
    const mondayDate = new Date(
      this.mondayDate.toDate().setDate(this.mondayDate.toDate().getDate() - 7)
    );
    const sundayDate = new Date(
      this.sundayDate.toDate().setDate(this.sundayDate.toDate().getDate() - 7)
    );
    this.mondayDate = moment(mondayDate);
    this.sundayDate = moment(sundayDate);
    this.getWeekCalendar();
  }

  private getWeekCalendar(): void {
    if(!this.isLoggedIn()) {
      return;
    }
    const request = new CalendarWeekRequest();
    request.weekStartDate = this.mondayDate.format('DD.MM.YYYY');
    request.weekEndDate = this.sundayDate.format('DD.MM.YYYY');
    this.calendarService.getCalendarWeek(request).subscribe((resp) => {
      this.calendarHourArray = resp;
    });
  }

  public refreshList(): void {
    this.getWeekCalendar();
  }

}
