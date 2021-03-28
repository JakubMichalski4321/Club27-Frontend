import { Component, OnInit } from '@angular/core';
import { IPajacyzm } from '../../../models/IPajacyzm';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-pajacyzmy',
  templateUrl: './pajacyzmy.component.html',
  styleUrls: ['./pajacyzmy.component.css']
})
export class PajacyzmyComponent implements OnInit {
  pajacyzmyList?: Array<IPajacyzm> = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getAllPajacyzmy();
  }

  getAllPajacyzmy(){
    this.httpService.getAllPajacyzmyList().subscribe(data => {
      console.log(data);
      this.pajacyzmyList = data;
    }, error => {
      console.log(error);
    });
  }
}
