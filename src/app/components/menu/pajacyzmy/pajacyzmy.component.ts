import {Component, Inject, OnInit} from '@angular/core';
import { IPajacyzm } from '../../../models/IPajacyzm';
import {HttpService} from '../../../services/http.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-pajacyzmy',
  templateUrl: './pajacyzmy.component.html',
  styleUrls: ['./pajacyzmy.component.css']
})
export class PajacyzmyComponent implements OnInit {
  pajacyzmyList?: Array<IPajacyzm> = [];
  pajacyzmContent = '';
  pajacyzmAuthor = '';
  showReasonText = '';
  displaySend = false;
  currentPageDisplay = 1;

  constructor(private httpService: HttpService,  @Inject(DOCUMENT) private _document: Document) {
  }

  ngOnInit(): void {
    this.getAllPajacyzmy();
    this.pajacyzmyList.sort((pajacyzm1, pajacyzm2) =>
      (pajacyzm1.createdDate > pajacyzm2.createdDate) ? 1 : ((pajacyzm2.createdDate > pajacyzm1.createdDate)? -1 :0
      ))
  }

  refreshPage(){
    this._document.defaultView.location.reload();
  }

  getAllPajacyzmy(){
    this.httpService.getAllPajacyzmyList().subscribe(data => {
      console.log(data);
      this.pajacyzmyList = data;
    }, error => {
      console.log(error);
    });
  }

  areAllFillIn() {
    return (this.pajacyzmContent != '' && this.pajacyzmContent != null) && (this.pajacyzmAuthor != '' && this.pajacyzmAuthor != null);
  }

  sendPajacyzm() {
    let jsonText = this.convertDataToJson();
    this.httpService.submitPajacyzm(jsonText);
    this.displaySend = true;
    this.getAllPajacyzmy();
  }

  showReason(reason: string) {
    this.showReasonText = reason;
    console.log(reason)
  }

  private convertDataToJson() {
    return {
      content: this.pajacyzmContent,
      author: this.pajacyzmAuthor
    };
  }
}
