import { Component, OnInit } from '@angular/core';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-timer27',
  templateUrl: './timer27.component.html',
  styleUrls: ['./timer27.component.css']
})
export class Timer27Component implements OnInit {

  sub: Subscription;
  dateFrom1997: Date = new Date('1997-01-01');
  date27Finish: Date = new Date('2024-01-01');
  differenceTime: any;
  timeToFinish: (number)[] = [];

  constructor() {
    this.sub = interval(1000).subscribe((x => {
      this.fillTimeToFinishArray();
      }));
  }

  ngOnInit(): void {
    this.differenceTime = this.date27Finish.getTime() - this.dateFrom1997.getTime();
    this.fillTimeToFinishArray();
    console.log(this.date27Finish);
    console.log(this.timeToFinish);
  }

  fillTimeToFinishArray(){
    let date27Finish: Date = new Date('2024-01-01');
    let timeDifference = date27Finish.getTime() - Date.now();
    let s: number = Math.floor(timeDifference / 1000);
    let m: number = Math.floor(s / 60);
    let h: number = Math.floor(m / 60);
    let d = Math.floor(h / 24);

    h %= 24;
    m %= 60;
    s %= 60;

    this.timeToFinish = [d, h, m, s];
  }

}
