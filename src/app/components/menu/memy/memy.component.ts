import { Component, OnInit } from '@angular/core';
import {IMem} from '../../../models/IMem';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-memy',
  templateUrl: './memy.component.html',
  styleUrls: ['./memy.component.css']
})
export class MemyComponent implements OnInit {

  memyList?: Array<IMem> = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getAllMemy();
  }

  getAllMemy(){
    this.httpService.getAllMemyList().subscribe(data => {
      console.log(data);
      this.memyList = data;
    }, error => {
      console.log(error);
    });
  }
}
