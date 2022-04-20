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
  date27Finish: Date = new Date('2025-01-01');
  timeToFinish: (number)[] = [];
  showProgressBar: boolean;
  private progressTime: number;
  percentageTimeLeft: number;

  constructor() {
    this.sub = interval(1000).subscribe((x => {
      this.fillTimeToFinishArray();
      }));
    this.showProgressBar = false;
  }

  ngOnInit(): void {
    this.fillTimeToFinishArray();
    this.progressTime = (Date.now() - this.dateFrom1997.getTime()) / (this.date27Finish.getTime() - this.dateFrom1997.getTime());
    this.percentageTimeLeft = Math.floor(100 - this.progressTime*100) + 1;
  }

  fillTimeToFinishArray(){
    let date27Finish: Date = new Date('2025-01-01');
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

  switchProgressBarDisplay() {
    this.showProgressBar = !this.showProgressBar;
  }
}
