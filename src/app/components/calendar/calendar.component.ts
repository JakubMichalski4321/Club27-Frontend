import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { CheckedHour } from 'src/app/models/calendar/CheckedHour';
import { UserWithCheckedHours } from 'src/app/models/calendar/UserWithCheckedHours';
import { NavBarService } from 'src/app/services/nav-bar.service';
import * as moment from 'moment'

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

  userWithCheckedDays: UserWithCheckedHours[] = [];

  constructor(
    private navBarService: NavBarService,
    ) { }

  ngOnInit(): void {
    this.setMondayAndSundayDate();
    for(let i=1; i<=24; i++) {
      this.hours.push(i);
    }
    this.testData();
  }

  getHourUsers(day: number, hour: number): string[] {
    return  this.userWithCheckedDays.filter(user =>
      user.checkedHours.find(ch =>
        ch.day == day && ch.hour == hour) != null)
      .map(user => user.username);
  }

  isLoggedIn(): boolean {
    return this.navBarService.isLoggedIn();
  }

  checkOrUncheckHour(day: number, hour: number): void {
    if(this.isChecked(day, hour)) {
      this.userWithCheckedDays.find(user => user.username === 'Jackob')
        .checkedHours
        .splice(this.userWithCheckedDays.find(user => user.username === 'Jackob')
        .checkedHours.findIndex(ch => ch.day == day && ch.hour == hour), 1)
    } else {
      if (this.userWithCheckedDays.filter(user => user.username === 'Jackob').length > 0) {
        this.userWithCheckedDays.find(user => user.username === 'Jackob')
        .checkedHours.push( {
          hour: hour,
          day: day,
        });
      } else {
        this.userWithCheckedDays.push({
          username: 'Jackob',
          checkedHours: [
            {
              hour: hour,
              day: day,
            },
          ]
        });
      }
    }
  }

  isChecked(day: number, hour: number): boolean {
    return this.userWithCheckedDays.find(user => user.username === 'Jackob' && user.checkedHours.find(ch => ch.day == day && ch.hour == hour) != null) != null;
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
  }

  goBeforeWeek() {
    const mondayDate = new Date(this.mondayDate.toDate().setDate( this.mondayDate.toDate().getDate() - 6));
    const sundayDate = new Date(this.sundayDate.toDate().setDate( this.sundayDate.toDate().getDate() - 6));
    this.mondayDate = moment(mondayDate);
    this.sundayDate = moment(sundayDate);
  }

  testData() {
    this.userWithCheckedDays.push({
      username: 'XSebek',
      checkedHours: [
        {
          hour: 2,
          day: 2,
        },
        {
          hour: 2,
          day: 4,
        },
      ]
    });
    this.userWithCheckedDays.push({
      username: 'Jackob',
      checkedHours: [
        {
          hour: 3,
          day: 2,
        },
        {
          hour: 2,
          day: 4,
        },
      ]
    });
  }

}
