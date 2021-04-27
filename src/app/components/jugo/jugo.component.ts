import { Component, OnInit } from '@angular/core';
import {IJugo} from '../../models/IJugo';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-jugo',
  templateUrl: './jugo.component.html',
  styleUrls: ['./jugo.component.css']
})
export class JugoComponent implements OnInit {

  jugoList?: Array<IJugo> = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  this.getJugoList();
  }

  getJugoList(){
    this.httpService.getAllJugoList().subscribe(data => {
      console.log(data);
      this.jugoList = data;
    }, error => {
      console.log(error);
    });
  }

}
