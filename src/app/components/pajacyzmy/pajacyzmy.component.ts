import { Component, Inject, OnInit } from '@angular/core';
import { IPajacyzm } from '../../models/components/pajacyzm/IPajacyzm';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageRequest } from 'src/app/models/common/PageRequest';
import { IPajacyzmyWithCounter } from 'src/app/models/components/pajacyzm/IPajacyzmyWithCounter';
import { PajacyzmService } from 'src/app/services/comp/pajacyzm.service';

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
  itemsPerPage = 10;
  pajacyzmyListWithCounter?: IPajacyzmyWithCounter;
  allPajacyzmy = 0;

  pageRequest = new PageRequest();

  protected aFormGroup: FormGroup;

  constructor(private pajacyzmService: PajacyzmService,
              @Inject(DOCUMENT)
              private _document: Document,
              private formBuilder: FormBuilder
              ) {
                this.pageRequest.pageNumber = 1;
                this.pageRequest.numberPerPage = 10;
  }

  ngOnInit(): void {
    this.getAllPajacyzmy(0);
    this.pajacyzmyList.sort((pajacyzm1, pajacyzm2) =>
      (pajacyzm1.createdDate > pajacyzm2.createdDate) ? 1 : ((pajacyzm2.createdDate > pajacyzm1.createdDate)? -1 :0
      ));
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  refreshPage(){
    this._document.defaultView.location.reload();
  }

  getAllPajacyzmy(pageNumber: number){
    this.pageRequest.pageNumber = pageNumber;
    this.pajacyzmService.getAllPajacyzmyList(this.pageRequest).subscribe(data => {
      this.pajacyzmyListWithCounter = data;
      this.allPajacyzmy = this.pajacyzmyListWithCounter.counter;
      this.pajacyzmyList = this.pajacyzmyListWithCounter.pajacyzmy;
    }, error => {
      console.log(error);
    });
  }

  areAllFillIn() {
    return (this.pajacyzmContent != '' && this.pajacyzmContent != null) && (this.pajacyzmAuthor != '' && this.pajacyzmAuthor != null);
  }

  sendPajacyzm() {
    let jsonText = this.convertDataToJson();
    this.pajacyzmService.submitPajacyzm(jsonText);
    this.displaySend = true;
    this.getAllPajacyzmy(0);
  }

  showReason(reason: string) {
    this.showReasonText = reason;
  }

  private convertDataToJson() {
    return {
      content: this.pajacyzmContent,
      author: this.pajacyzmAuthor
    };
  }
}
