import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../../../services/http.service';
import {IPajacyzm} from '../../../../models/IPajacyzm';

@Component({
  selector: 'app-pajacyzm',
  templateUrl: './pajacyzm.component.html',
  styleUrls: ['./pajacyzm.component.css']
})
export class PajacyzmComponent implements OnInit, OnDestroy{

  pajacyzm: IPajacyzm;
  pajacyzmId: any;
  private sub: any;

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.pajacyzmId = params['pajacyzmId'];
    });
    this.getPajacyzm()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getPajacyzm(){
    this.httpService.getPajacyzm(this.pajacyzmId).subscribe(data => {
      console.log(data);
      this.pajacyzm = data;
    }, error => {
      console.log(error);
    });
  }

}
