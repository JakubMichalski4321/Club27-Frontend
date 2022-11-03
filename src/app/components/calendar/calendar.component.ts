import { Component, OnInit } from '@angular/core';
import { CheckedHour } from 'src/app/models/calendar/CheckedHour';
import { UserWithCheckedHours } from 'src/app/models/calendar/UserWithCheckedHours';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  dayOfWeeksName: string[] = ['Pon', 'Wt', 'Śr', 'Czw', 'Piątunio', 'Sobota', '..i humor popsuty'];
  hours: number[] = [];
  dayOfWeek: number[] = [1, 2, 3, 4, 5, 6, 7];

  userWithCheckedDays: UserWithCheckedHours[] = [];

  constructor(
    private navBarService: NavBarService,
    ) { }

  ngOnInit(): void {
    for(let i=1; i<=24; i++) {
      this.hours.push(i);
    }
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
      console.log('1');
      this.userWithCheckedDays.find(user => user.username === 'Jackob')
        .checkedHours
        .splice(this.userWithCheckedDays.find(user => user.username === 'Jackob')
        .checkedHours.findIndex(ch => ch.day == day && ch.hour == hour), 1)
    } else {
      console.log('2');

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

}
