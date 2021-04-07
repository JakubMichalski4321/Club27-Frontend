import { Component, OnInit } from '@angular/core';
import { IMem } from '../../../models/IMem';
import { HttpService } from '../../../services/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddMemeComponent} from './add-meme/add-meme.component';

@Component({
  selector: 'app-memy',
  templateUrl: './memy.component.html',
  styleUrls: ['./memy.component.css']
})
export class MemyComponent implements OnInit {

  memyList?: Array<IMem> = [];
  currentPageDisplay = 1;

  constructor(private httpService: HttpService, private sanitizer: DomSanitizer, private modal: NgbModal) { }

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

  makeUrlTrust(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onClick() {
    this.modal.open(AddMemeComponent);
  }

  makeArrayOfNumbers(iterations: string){
    return Array(iterations.valueOf());
  }
}
