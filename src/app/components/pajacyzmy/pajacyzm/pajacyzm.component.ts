import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PajacyzmService } from 'src/app/services/comp/pajacyzm.service';
import {IPajacyzm} from '../../../models/components/pajacyzm/IPajacyzm';

@Component({
  selector: 'app-pajacyzm',
  templateUrl: './pajacyzm.component.html',
  styleUrls: ['./pajacyzm.component.css']
})
export class PajacyzmComponent implements OnInit, OnDestroy{

  pajacyzm: IPajacyzm;
  pajacyzmId: any;
  private sub: any;
  audio = new Audio();
  playMusicNow = true;

  constructor(
    private route: ActivatedRoute,
    private pajacyzmService: PajacyzmService,
  ) { }

  ngOnInit(): void {
    this.audio.src = "../../../../../assets/pajacyzm.mp3";
    this.audio.load();
    this.startMusicPlay();
    this.sub = this.route.params.subscribe(params => {
      this.pajacyzmId = params['pajacyzmId'];
    });
    this.getPajacyzm();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.audio.pause();
  }

  startMusicPlay(){
    this.playMusicNow = true;
    this.audio.play();
  }

  stopMusicPlay(){
    this.audio.pause()
    this.playMusicNow = false;
  }



  getPajacyzm(){
    this.pajacyzmService.getPajacyzm(this.pajacyzmId).subscribe(data => {
      this.pajacyzm = data;
    }, error => {
      console.log(error);
    });
  }

}
